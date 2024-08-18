import { achievedBucketItems, deleteBucketItems } from "@/lib/api/bucketListItem";
import { bucketListItemsState } from "@/lib/atom/bucketListItems";
import { selectedBucketListItemState } from "@/lib/atom/selectedBucketListItem";
import { drizzleDb } from "@/lib/db/db";
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
  const bucketItemIds = selectedBucketItems.map((s) => s.id);

  // チェックボックスが外れてもモーダルからアイテムが消えないように、モーダルが開いたらselected...Items を更新しない
  const [selectedBucketItemsInModal, setSelectedBucketItemsInModal] = useState<
    {
      id: string;
      title: string;
      deadline: Date;
    }[]
  >([]);
  useEffect(() => {
    if (!isOpenModal) {
      setSelectedBucketItemsInModal(selectedBucketItems);
    }
  }, [isOpenModal, selectedBucketItems]);

  // やりたいこと削除・達成 ================================================================================

  const handleClickEditButton = async () => {
    try {
      // 削除
      if (editType === EditTypeValues.DELETE) {
        await deleteBucketItems(drizzleDb, bucketItemIds);
      }

      // 達成
      if (editType === EditTypeValues.ACHIEVE) {
        await achievedBucketItems(drizzleDb, bucketItemIds);
      }
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
