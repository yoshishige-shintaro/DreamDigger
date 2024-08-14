import { bucketListItemsState } from "@/lib/atom/bucketListItems";
import { BucketItem, RawBucketItem, StatusValue } from "@/lib/types/BucketItem";
import { CATEGORY_ALL_ITEM } from "@/lib/types/Category";
import { SQLInsertBucketListItem } from "@/lib/utils/db";
import { createUuid } from "@/lib/utils/uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { Animated, Dimensions } from "react-native";
import { useSetRecoilState } from "recoil";
import z from "zod";

// ////////////////////////////////////////////////////////////////////////////////////////////////
// schema 定義

const schema = z.object({
  bucketItemTitle: z.string().trim().min(1, { message: "やりたいことを入力してください" }),
  categoryId: z.string().optional(),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "未来の日時を設定してください",
  }),
});

// schema から型を抽出
export type AddBucketItemFormInput = z.infer<typeof schema>;

const buildBody = (data: AddBucketItemFormInput): RawBucketItem => ({
  uuid: createUuid(),
  created_at_iso_string: new Date().toISOString(),
  deadline_iso_string: data.deadline.toISOString(),
  achieved_at_iso_string: null,
  category_id: data.categoryId ?? null,
  status: StatusValue.DURING_CHALLENGE,
  title: data.bucketItemTitle,
});

type UseAddBucketItemModal = (args: { currentCategoryId: string }) => {
  control: Control<AddBucketItemFormInput>;
  onSubmit: () => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  isOpenModal: boolean;
  slideAnim: Animated.Value;
};

// hooks 本体 ========================================================================================
export const useAddBucketItemModal: UseAddBucketItemModal = (args) => {
  const { currentCategoryId } = args;

  const setBucketItems = useSetRecoilState(bucketListItemsState);
  const defaultValues: AddBucketItemFormInput = {
    bucketItemTitle: "",
    categoryId: currentCategoryId === CATEGORY_ALL_ITEM.id ? undefined : currentCategoryId,
    deadline: new Date(),
  };

  // React Hook Form
  const { control, handleSubmit, reset, setValue } = useForm<AddBucketItemFormInput>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  // FIXME:なぜかdefaultValue だと表示切り替わらないので useEffect を使っている
  useEffect(() => {
    setValue("categoryId", currentCategoryId);
  }, [currentCategoryId]);

  const db = useSQLiteContext();
  const handleClickAddButton = async (data: AddBucketItemFormInput) => {
    try {
      await db.execAsync(SQLInsertBucketListItem(buildBody(data)));
      const bucketItemsRes = (await db.getAllAsync(
        "SELECT * FROM bucket_items",
      )) as RawBucketItem[];
      setBucketItems(bucketItemsRes.map((r) => new BucketItem(r)));
    } catch (e) {
      console.log("ERROR!!!");
      console.log(e);
      return;
    }

    console.log("やりたいこと追加しました");

    closeModal();
  };

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
      setValue("bucketItemTitle", "");
      setValue("deadline", new Date());
    });
  };
  const openModal = () => {
    setIsOpenModal(true);
    // モーダルを表示するアニメーション
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return {
    control,
    onSubmit: handleSubmit(handleClickAddButton),
    closeModal,
    openModal,
    isOpenModal,
    slideAnim,
  };
};
