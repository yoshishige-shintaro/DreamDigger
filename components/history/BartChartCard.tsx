import { useTheme } from "@/hooks/common/useTheme";
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
  const { theme } = useTheme();
  return (
    <View
      className="mt-12 rounded-xl items-center py-8"
      style={{
        shadowColor: theme.shadowColor,
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 8 },
        backgroundColor: theme.bg.secondary,
      }}
    >
      <Text className="text-3xl font-bold text-center mb-4" style={{ color: theme.text.primary }}>
        過去30日
      </Text>
      <View className="flex-row justify-center items-baseline gap-2">
        <Text className="text-5xl font-bold" style={{ color: theme.text.primary }}>
          {achievedCount}
        </Text>
        <Text className="text-3xl font-bold" style={{ color: theme.text.primary }}>
          コ
        </Text>
      </View>
      <View className="pl-2 mt-[-40] bg-transparent">
        <VictoryChart domainPadding={{ x: 10 }}>
          <VictoryAxis
            style={{
              axis: { stroke: theme.text.primary },
              tickLabels: { fill: theme.text.primary },
            }}
            tickFormat={(t) => format(t, "MM/dd")}
            tickValues={xTickValues}
          />
          <VictoryAxis
            style={{
              axis: { stroke: theme.text.primary },
              tickLabels: { fill: theme.text.primary },
              grid: { stroke: theme.text.secondary },
            }}
            dependentAxis
            tickValues={yTickValues}
          />
          <VictoryBar
            data={chartData}
            barRatio={1} // 棒の横幅を調整
            style={{
              data: { padding: 0, fill: theme.accent.primary }, // 棒同士の間隔を0にする
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

export default BarChartCard;
