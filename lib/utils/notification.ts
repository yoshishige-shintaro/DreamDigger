import { formatDate } from "@/lib/utils/date";
import * as Notifications from "expo-notifications";

// 通知の許可情報を取得する関数
export const checkNotificationPermissions = async (): Promise<boolean> => {
  let isNotificationPermitted = false;
  // 現在の許可状況を取得
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  // 通知許可が得られている場合
  if (existingStatus == Notifications.PermissionStatus.GRANTED) {
    isNotificationPermitted = true;
  }

  return isNotificationPermitted;
};

// 通知をすケージューリングする
export const scheduleNotifications = async (
  bucketItemTitle: string,
  deadline: Date,
  remindDate: Date,
): Promise<string> => {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "発掘リマインド",
      body: `「${bucketItemTitle}」の達成期限は${formatDate(deadline)}です。`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: remindDate,
    },
  });
  return notificationId;
};
