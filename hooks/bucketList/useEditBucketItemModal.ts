import { bucketListItemsState } from "@/lib/atom/bucketListItems";
import { selectedBucketListItemState } from "@/lib/atom/selectedBucketListItem";
import { BucketItem, RawBucketItem, StatusValue } from "@/lib/types/BucketItem";
import { TableValue } from "@/lib/utils/table";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";

export const EditTypeValues = {
  DELETE: "delete",
  ACHIEVE: "achieve",
} as const;

type EditTypeValues = (typeof EditTypeValues)[keyof typeof EditTypeValues];

type UseEditBucketItemModal = () => {
  handleClickEditButton: () => Promise<void>;
  openModal: (editType: EditTypeValues) => void;
  closeModal: () => void;
  isOpenModal: boolean;
  selectedBucketItemsInModal: {
    id: string;
    title: string;
    deadline: Date;
  }[];
  slideAnim: Animated.Value;
  isDisabledDeleteButton: boolean;
  editType: EditTypeValues;
};

// hooks 本体 ========================================================================================
export const useEditBucketItemModal: UseEditBucketItemModal = () => {
  const [editType, setEditTyp] = useState<EditTypeValues>(EditTypeValues.DELETE);

  // モーダル開閉処理 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [isOpenModal, setIsOpenModal] = useState(false);
  const deviceHeight = Dimensions.get("window").height;
  const slideAnim = useRef(new Animated.Value(deviceHeight)).current; // 初期位置を設定

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: deviceHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOpenModal(false);
    });
  };
  const openModal = (editType: EditTypeValues) => {
    setEditTyp(editType);
    setIsOpenModal(true);
    // モーダルを表示するアニメーション
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const [selectedBucketItems, setSelectedBucketItems] = useRecoilState(selectedBucketListItemState);
  const setBucketItems = useSetRecoilState(bucketListItemsState);
  const uuids = selectedBucketItems.map((s) => s.id);
  const [selectedBucketItemsInModal, setSelectedBucketItemsInModal] = useState<
    {
      id: string;
      title: string;
      deadline: Date;
    }[]
  >([]);

  // チェックボックスが外れてもモーダルからアイテムが消えないように、モーダルが開いたらselected...Items を更新しない
  useEffect(() => {
    if (!isOpenModal) {
      setSelectedBucketItemsInModal(selectedBucketItems);
    }
  }, [isOpenModal, selectedBucketItems]);

  // やりたいこと削除・達成 ================================================================================

  const db = useSQLiteContext();
  const handleClickEditButton = async () => {
    try {
      // 削除
      if (editType === EditTypeValues.DELETE) {
        await db.execAsync(
          `DELETE FROM ${TableValue.BUCKET_ITEMS_TABLE} WHERE uuid IN (${uuids
            .map((uuid) => `'${uuid}'`)
            .join(", ")})`,
        );
        console.log("やりたいこと削除しました");
      }

      // 達成
      if (editType === EditTypeValues.ACHIEVE) {
        await db.execAsync(
          `UPDATE ${TableValue.BUCKET_ITEMS_TABLE} SET status = '${
            StatusValue.ACHIEVED
          }' WHERE uuid IN (${uuids.map((uuid) => `'${uuid}'`).join(", ")})`,
        );
        console.log("やりたいこと達成しました");
      }

      // アイテムの再取得 TODO:共通化
      const bucketItemsRes = (await db.getAllAsync(
        "SELECT * FROM bucket_items",
      )) as RawBucketItem[];
      setBucketItems(bucketItemsRes.map((r) => new BucketItem(r)));
    } catch (e) {
      console.log("ERROR!!!");
      console.log(e);
      return;
    }

    setSelectedBucketItems([]);
    closeModal();
  };

  const isDisabledDeleteButton = selectedBucketItems.length === 0;

  return {
    handleClickEditButton,
    closeModal,
    openModal,
    isOpenModal,
    slideAnim,
    selectedBucketItemsInModal,
    isDisabledDeleteButton,
    editType,
  };
};
