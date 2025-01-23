import BucketListItem from "@/components/bucketList/BucketListItem";
import { BucketItem } from "@/lib/types/BucketItem";
import { FontAwesome6 } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";

type BucketListProps = {
  bucketItems: BucketItem[];
};

const BucketList = (props: BucketListProps): JSX.Element => {
  const { bucketItems } = props;
  console.log("bucketItems===============");

  console.log(bucketItems);

  return bucketItems.length === 0 ? (
    <View className="items-center mt-[70%]">
      <FontAwesome6 name="person-digging" size={72} color="gray" />
      <Text className="text-base text-gray-500">やりたいことが登録されていません</Text>
    </View>
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
