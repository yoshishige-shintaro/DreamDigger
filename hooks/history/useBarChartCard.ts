import { BucketItem, RawBucketItem } from "@/lib/types/BucketItem";
import { areDatesEqual, getLast30Days } from "@/lib/utils/date";

type UseBarChartCard = (args: { achievedBucketItems: RawBucketItem[] }) => {
  chartData: { x: Date; y: number }[];
  achievedCount: number;
  xTickValues: (Date | null)[];
  yTickValues: number[];
};

export const useBartChartCard: UseBarChartCard = (args) => {
  const { achievedBucketItems } = args;
  const last30Days = getLast30Days();
  // 棒グラフで使用するデータ
  const chartData: { x: Date; y: number }[] = last30Days.map((date) => ({
    x: date,
    y: achievedBucketItems.filter((item) => areDatesEqual(item.achievedAt as Date, date)).length,
  }));

  // 達成した数
  const achievedCount = chartData.reduce((acc, cur) => {
    return (acc += cur.y);
  }, 0);

  // 軸のメモリ
  const xTickValues = chartData.map((d, i) => (i % 5 === 0 ? d.x : null)).filter((d) => d);
  const yTickValues = [5, 10, 15, 20, 25, 30];

  return {
    achievedCount,
    chartData,
    xTickValues,
    yTickValues,
  };
};
