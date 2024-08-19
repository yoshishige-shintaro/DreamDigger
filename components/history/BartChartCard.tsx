import { BASE_COLOR } from "@/constants/Colors";
import { useBartChartCard } from "@/hooks/history/useBarChartCard";
import { RawBucketItem } from "@/lib/types/BucketItem";
import { format } from "date-fns";
import { Text, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory-native";

type BarChartCardProps = {
  achievedBucketItems: RawBucketItem[];
};

const BarChartCard = (props: BarChartCardProps): JSX.Element => {
  const { chartData, achievedCount, xTickValues, yTickValues } = useBartChartCard(props);
  return (
    <View
      className="mt-12 rounded-xl items-center py-8 bg-white"
      style={{
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 8 },
      }}
    >
      <Text className="text-3xl font-bold text-center mb-4">過去30日</Text>
      <View className="flex-row justify-center items-baseline gap-2">
        <Text className="text-5xl font-bold">{achievedCount}</Text>
        <Text className="text-3xl font-bold">コ</Text>
      </View>
      <View className="pl-2 mt-[-40] bg-transparent">
        <VictoryChart domainPadding={{ x: 10 }}>
          <VictoryAxis tickFormat={(t) => format(t, "MM/dd")} tickValues={xTickValues} />
          <VictoryAxis dependentAxis tickValues={yTickValues} />
          <VictoryBar
            data={chartData}
            barRatio={1} // 棒の横幅を調整
            style={{
              data: { padding: 0, fill: BASE_COLOR }, // 棒同士の間隔を0にする
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

export default BarChartCard;
