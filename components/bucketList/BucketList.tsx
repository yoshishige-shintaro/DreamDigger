import BucketListItem from "@/components/bucketList/BucketListItem";
import { BucketItem } from "@/lib/types/BucketItem";
import { FontAwesome6 } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";

type BucketListProps = {
  bucketItems: BucketItem[];
};

const BucketList = (props: BucketListProps): JSX.Element => {
  const { bucketItems } = props;

  return bucketItems.length === 0 ? (
    <View className="flex-1 justify-center items-center gap-4">
      <FontAwesome6 name="person-digging" size={72} color="gray" />
      <Text className="text-base text-gray-500">やりたいことが登録されていません</Text>
    </View> // TODO: 画面全体がスクロールされるように修正
  ) : (
    <View>
      <FlatList
        // 締め切り期限までの残り時間（降順）
        data={bucketItems}
        contentContainerStyle={{ paddingTop: 48, paddingBottom: 175 }}
        renderItem={({ item: bucketItem }) => {
          return (
            <BucketListItem
              key={bucketItem.id}
              id={bucketItem.id}
              title={bucketItem.title}
              deadline={bucketItem.deadline}
            />
          );
        }}
      />
    </View>
  );
};

export default BucketList;
