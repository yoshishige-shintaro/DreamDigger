import { ElapsedTimeObj, useBucketListItem } from "@/hooks/bucketList/useBucketListItem";
import { Text, View } from "react-native";

type BucketListItemProps = {
  title: string;
  deadline: Date;
};

const BucketListItem = (props: BucketListItemProps): JSX.Element => {
  const { deadline, title } = props;
  const { timeToDeadline, isExpiredDeadline } = useBucketListItem({ deadline });
  return (
    <View className="flex-row justify-between items-center bg-white h-16 p-4 rounded-md mb-1">
      {/* やりたいことタイトル */}
      <Text className="text-base">{title}</Text>

      {/* 期限までの残り時間 */}
      <Text className={`text-base ${isExpiredDeadline ? "text-rose-500" : ""}`}>
        {displayTimeToDeadLine(timeToDeadline)}
      </Text>
    </View>
  );
};

export default BucketListItem;

const displayTimeToDeadLine = (timeToDeadline: ElapsedTimeObj): string => {
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
