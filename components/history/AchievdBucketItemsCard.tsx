import { useTheme } from "@/hooks/common/useTheme";
import { useAchievedBucketItemsCard } from "@/hooks/history/useAchievedBucketItemsCard";
import { RawBucketItem } from "@/lib/types/BucketItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

type AchievedBucketItemsCardProps = {
  achievedBucketItems: RawBucketItem[];
};

const AchievedBucketItemsCard = (props: AchievedBucketItemsCardProps): JSX.Element => {
  const {
    achievedCount,
    categorizedBucketItems,
    selectPickerPlaceholder,
    selectPickerItems,
    selectedCategoryId,
    setSelectedCategoryId,
  } = useAchievedBucketItemsCard(props);
  const { theme, isDarkMode } = useTheme();
  return (
    <View
      className="my-12 py-8 px-8 rounded-xl items-center bg-white"
      style={{
        shadowColor: theme.shadowColor,
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 8 },
        backgroundColor: theme.bg.secondary,
      }}
    >
      <Text className="text-3xl font-bold text-center mb-4" style={{ color: theme.text.primary }}>
        発掘リスト
      </Text>
      <View className="w-full flex-row justify-between items-center px-1">
        <View>
          <RNPickerSelect
            value={selectedCategoryId}
            onValueChange={(value: string) => setSelectedCategoryId(value)}
            placeholder={selectPickerPlaceholder}
            items={selectPickerItems}
            darkTheme={isDarkMode}
            style={{
              // 入力欄をタップしても Picker を開けるよにする設定
              inputIOSContainer: {
                pointerEvents: "none",
              },
              inputIOS: {
                color: theme.text.primary,
              },
              placeholder: {
                color: theme.text.primary,
              },
              viewContainer: {
                width: 150,
                paddingVertical: 8,
              },
            }}
          />
        </View>
        <View className="flex-row items-center">
          <Text className="text-base" style={{ color: theme.text.primary }}>
            {achievedCount}
          </Text>
          <Text style={{ color: theme.text.primary }}>件</Text>
        </View>
      </View>
      {achievedCount === 0 ? (
        <View className="h-96 justify-center items-center gap-4">
          <MaterialCommunityIcons name="yoga" size={72} color="gray" />
          <Text className="text-base text-gray-500">発掘物がありません</Text>
        </View>
      ) : (
        <ScrollView className="w-full h-96">
          {categorizedBucketItems.map((item) => (
            <View
              key={item.uuid}
              className="p-2 border border-[#ccc] rounded-lg mb-2"
              style={{ backgroundColor: theme.bg.primary }}
            >
              <Text className="text-base" style={{ color: theme.text.primary }}>
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default AchievedBucketItemsCard;
