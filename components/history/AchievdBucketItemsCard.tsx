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
  return (
    <View
      className="my-12 py-8 px-8 rounded-xl items-center bg-white"
      style={{
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 8 },
      }}
    >
      <Text className="text-3xl font-bold text-center mb-4">発掘リスト</Text>
      <View className=" w-full flex-row justify-between items-center px-1">
        <View>
          <RNPickerSelect
            value={selectedCategoryId}
            onValueChange={(value: string) => setSelectedCategoryId(value)}
            placeholder={selectPickerPlaceholder}
            items={selectPickerItems}
            style={{
              placeholder: {
                color: "#000",
              },
              viewContainer: {
                width: 150,
                paddingVertical: 8,
              },
            }}
          />
        </View>
        <View className="flex-row items-center">
          <Text className="text-base">{achievedCount}</Text>
          <Text>件</Text>
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
            <View key={item.uuid} className="p-2 border border-[#ccc] rounded-lg mb-2">
              <Text className="text-base">{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default AchievedBucketItemsCard;
