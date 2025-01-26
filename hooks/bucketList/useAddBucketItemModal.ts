import { addBucketItem } from "@/lib/api/bucketListItem";
import { drizzleDb } from "@/lib/db/db";
import { RawBucketItem, StatusValue } from "@/lib/types/BucketItem";
import { CATEGORY_ALL_ITEM } from "@/lib/types/Category";
import {
  checkNotificationPermissions,
  requestNotificationPermissions,
  scheduleNotifications,
} from "@/lib/utils/notification";
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
  isRemind: z.boolean(),
  remindDate: z.date().refine((date) => date > new Date(), {
    message: "未来の日時を設定してください",
  }),
});

// schema から型を抽出
export type AddBucketItemFormInput = z.infer<typeof schema>;

type UseAddBucketItemModal = (args: { currentCategoryId: string }) => {
  control: Control<AddBucketItemFormInput>;
  onSubmit: () => Promise<void>;
  openModal: () => Promise<void>;
  closeModal: () => void;
  isOpenModal: boolean;
  slideAnim: Animated.Value;
  isRemind: boolean;
};

// hooks 本体 ========================================================================================
export const useAddBucketItemModal: UseAddBucketItemModal = (args) => {
  const { currentCategoryId } = args;

  const defaultValues: AddBucketItemFormInput = {
    bucketItemTitle: "",
    categoryId: currentCategoryId === CATEGORY_ALL_ITEM.id ? undefined : currentCategoryId,
    deadline: new Date(),
    isRemind: false,
    remindDate: new Date(),
  };

  // React Hook Form
  const { control, handleSubmit, setValue, watch, setError, reset } =
    useForm<AddBucketItemFormInput>({
      defaultValues,
      resolver: zodResolver(schema),
    });

  // FIXME:なぜかdefaultValue だと表示切り替わらないので useEffect を使っている
  useEffect(() => {
    setValue("categoryId", currentCategoryId);
  }, [currentCategoryId]);

  const handleClickAddButton = async (data: AddBucketItemFormInput) => {
    try {
      const { bucketItemTitle, isRemind, deadline, remindDate } = data;
      // 通知に紐づく id。初期値は null
      let notificationId: RawBucketItem["notificationId"] = null;
      // リマインド設定がある場合
      if (isRemind) {
        // リマインド日時が達成期限よりも前に設定されているかをチェックする
        if (deadline <= remindDate) {
          setError("remindDate", { message: "達成期限よりも前の日時を設定してください" });
          return;
        }

        // 通知権限があるかチェック
        const isNotificationsPermitted = await checkNotificationPermissions();

        // 通知権限がある時のみプッシュ通知をスケジュール
        if (isNotificationsPermitted) {
          notificationId = await scheduleNotifications(bucketItemTitle, deadline, remindDate);
        }
      }

      // やりたいこと追加 api にわたす body
      const body: RawBucketItem = {
        uuid: createUuid(),
        createdAt: new Date(),
        deadline: data.deadline,
        achievedAt: null,
        categoryId: data.categoryId ?? null,
        status: StatusValue.DURING_CHALLENGE,
        title: data.bucketItemTitle,
        notificationId: notificationId,
      };

      // やりたいこと追加
      await addBucketItem(drizzleDb, body);
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
    });
    reset();
  };
  const openModal = async () => {
    // 締切は現在から10分後にする
    setValue("deadline", new Date(new Date().getTime() + 10 * 60 * 1000));
    // リマインドは現在から５分後にする
    setValue("remindDate", new Date(new Date().getTime() + 5 * 60 * 1000));
    setIsOpenModal(true);
    // モーダルを表示するアニメーション
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // 通知権限をリクエストしないと設定画面に通知項目が出てこないのでリクエストしている
    await requestNotificationPermissions();
  };

  const isRemind = watch("isRemind");

  return {
    control,
    onSubmit: handleSubmit(handleClickAddButton),
    closeModal,
    openModal,
    isOpenModal,
    slideAnim,
    isRemind,
  };
};
