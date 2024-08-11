import { useEffect, useState } from "react";

export type ElapsedTimeObj = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type UseBucketListItem = (args: { deadline: Date }) => {
  timeToDeadline: ElapsedTimeObj;
  isExpiredDeadline: boolean;
};

export const useBucketListItem: UseBucketListItem = (args) => {
  const { deadline } = args;

  // 締め切りまでの残り時間を計算する
  const calculateTimeLeft = (): ElapsedTimeObj => {
    const difference = +new Date(deadline) - +new Date();
    // 初期値は 0 （期限切れの状態）
    let timeLeft: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  // 画面に表示するために useState で残り時間を管理
  const [timeToDeadline, setTimeToDeadline] = useState(calculateTimeLeft());

  // 1秒ごとのカウントダウン処理
  useEffect(() => {
    // 1秒おきに関数が働く
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeToDeadline(newTimeLeft);

      // newTimeLeft の全てのプロパティが 0 の場合は setInterval を削除する
      if (Object.values(newTimeLeft).every((value) => value === 0)) {
        clearInterval(timer);
      }
    }, 1000);

    // アンマウント時に setInterval 削除
    return () => clearInterval(timer);
  }, [deadline]);

  return {
    timeToDeadline,
    isExpiredDeadline: Object.values(timeToDeadline).every((value) => value === 0),
  };
};
