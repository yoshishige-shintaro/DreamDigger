import { addBucketItem } from "@/lib/api/bucketListItem";
import { drizzleDb } from "@/lib/db/db";
import { RawBucketItem, StatusValue } from "@/lib/types/BucketItem";
import { CATEGORY_ALL_ITEM } from "@/lib/types/Category";
// import { SQLInsertBucketListItem } from "@/lib/utils/db";
import { createUuid } from "@/lib/utils/uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { Animated, Dimensions } from "react-native";
import z from "zod";

// ////////////////////////////////////////////////////////////////////////////////////////////////
// schema 定義

const schema = z.object({
  bucketItemTitle: z
    .string()
    .trim()
    .min(1, { message: "やりたいことを入力してください" })
    .max(40, { message: "40文字以下で入力してください" }),
  categoryId: z.string().optional(),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "未来の日時を設定してください",
  }),
});

// schema から型を抽出
export type AddBucketItemFormInput = z.infer<typeof schema>;

const buildBody = (data: AddBucketItemFormInput): RawBucketItem => ({
  uuid: createUuid(),
  createdAt: new Date(),
  deadline: data.deadline,
  achievedAt: null,
  categoryId: data.categoryId ?? null,
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

  const handleClickAddButton = async (data: AddBucketItemFormInput) => {
    try {
      await addBucketItem(drizzleDb, buildBody(data));
    } catch (e) {
      console.log(e);
      throw e;
    }

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
