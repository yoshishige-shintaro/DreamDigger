import { selectedBucketListItemState } from "@/lib/atom/selectedBucketListItem";
import { ElapsedTimeObj, calculateTimeLeft } from "@/lib/utils/date";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type UseBucketListItem = (args: {
  id: string;
  title: string;
  deadline: Date;
  notificationId: string | null;
}) => {
  timeToDeadline: ElapsedTimeObj;
  isExpiredDeadline: boolean;
  isChecked: boolean;
  onClickCheckBox: () => void;
};

export const useBucketListItem: UseBucketListItem = (args) => {
  const { id, title, deadline, notificationId } = args;

  // 画面に表示するために useState で残り時間を管理
  const [timeToDeadline, setTimeToDeadline] = useState(calculateTimeLeft(deadline));

  // 1秒ごとのカウントダウン処理
  useEffect(() => {
    // 1秒おきに関数が働く
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(deadline);
      setTimeToDeadline(newTimeLeft);

      // newTimeLeft の全てのプロパティが 0 の場合は setInterval を削除する
      if (Object.values(newTimeLeft).every((value) => value === 0)) {
        clearInterval(timer);
      }
    }, 1000);

    // アンマウント時に setInterval 削除
    return () => clearInterval(timer);
  }, [deadline]);

  // チェックボックスのクリック処理
  const [selectedBucketListItem, setSelectedBucketListItem] = useRecoilState(
    selectedBucketListItemState,
  );
  const isChecked = selectedBucketListItem.map((item) => item.id).includes(id);
  const onClickCheckBox = (): void => {
    setSelectedBucketListItem((prev) =>
      isChecked
        ? prev.filter((item) => item.id !== id)
        : [...prev, { id, title, deadline, notificationId }],
    );
  };

  return {
    timeToDeadline,
    isExpiredDeadline: Object.values(timeToDeadline).every((value) => value === 0),
    isChecked,
    onClickCheckBox,
  };
};
