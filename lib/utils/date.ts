const daysOfWeek = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
const months = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

export function formatDate(date: Date): string {
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month}${day}日 ${dayOfWeek} ${hours}:${minutes}`;
}

// 過去30日間の日付を取得
export const getLast30Days = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(date);
  }

  return dates;
};

// 日付までの比較
export const areDatesEqual = (date1: Date, date2: Date) => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return d1.getTime() === d2.getTime();
};

export type ElapsedTimeObj = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// 締め切りまでの残り時間を計算する
export const calculateTimeLeft = (deadline:Date): ElapsedTimeObj => {
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

// 達成期限までの残り時間を表示 DD日 or HH時間 or MM分 or SS秒 形式で表示
export const displayTimeToDeadLine = (timeToDeadline: ElapsedTimeObj): string => {
  const { days, hours, minutes, seconds } = timeToDeadline;

  if (days > 0) {
    return `${days}日`;
  } else if (hours > 0) {
    return `${hours}時間`;
  } else if (minutes > 0) {
    return `${minutes}分`;
  }
  return `${seconds}秒`;
};
