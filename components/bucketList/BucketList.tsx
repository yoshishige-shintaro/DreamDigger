import BucketListItem from "@/components/bucketList/BucketListItem";
import { BucketItem } from "@/lib/types/BucketItem";
import { FlatList, View } from "react-native";

type BucketListProps = {
  bucketItems: BucketItem[];
};

const BucketList = (props: BucketListProps): JSX.Element => {
  const { bucketItems } = props;

  return (
    // TODO: 画面全体がスクロールされるように修正
    <View className="grow-0.8 mt-12">
      <FlatList
        // 締め切り期限までの残り時間（降順）
        data={bucketItems}
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
