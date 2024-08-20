import { TINT_COLOR } from "@/constants/Colors";
import { ElapsedTimeObj, useBucketListItem } from "@/hooks/bucketList/useBucketListItem";
import { Text, View } from "react-native";
import CheckBox from "react-native-check-box";

type BucketListItemProps = {
  id: string;
  title: string;
  deadline: Date;
};

const BucketListItem = (props: BucketListItemProps): JSX.Element => {
  const { title } = props;
  const { timeToDeadline, isExpiredDeadline, isChecked, onClickCheckBox } =
    useBucketListItem(props);

  return (
    <View
      style={{
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 4 },
      }}
      className="flex-row justify-between items-center bg-white h-16 p-4 rounded-md mb-1 w-full"
    >
      <CheckBox
        isChecked={isChecked}
        onClick={onClickCheckBox}
        checkBoxColor="#ccc"
        checkedCheckBoxColor={TINT_COLOR}
        rightTextView={
          <Text
            numberOfLines={1}
            className={`text-base w-[75%] ml-1 ${isChecked ? "line-through text-[#ccc]" : ""}`}
          >
            {title}
          </Text>
        }
      />
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
