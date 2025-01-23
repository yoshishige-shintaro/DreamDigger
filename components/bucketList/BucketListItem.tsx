import { TINT_COLOR } from "@/constants/Colors";
import { useBucketListItem } from "@/hooks/bucketList/useBucketListItem";
import { displayTimeToDeadLine } from "@/lib/utils/date";
import { Pressable, Text, View } from "react-native";
import CheckBox from "react-native-check-box";

type BucketListItemProps = {
  id: string;
  title: string;
  deadline: Date;
  notificationId: string | null;
  // きしょいけど
  isEdit?: boolean;
};

const BucketListItem = (props: BucketListItemProps): JSX.Element => {
  const { title, isEdit = false } = props;
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
      className="flex-row justify-between items-center bg-white h-auto p-4 rounded-md mb-1 w-full"
    >
      <View className="flex-row items-center">
        <CheckBox
          isChecked={isChecked}
          onClick={onClickCheckBox}
          checkBoxColor="#ccc"
          checkedCheckBoxColor={TINT_COLOR}
        />
        <View className="ml-2">
          <Pressable onPress={onClickCheckBox}>
            <Text className={`text-base w-60 ${isChecked ? "line-through text-[#ccc]" : ""}`}>
              {title}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* 期限までの残り時間 */}
      {!isEdit && (
        <Text className={`text-base ${isExpiredDeadline ? "text-rose-500" : ""}`}>
          {displayTimeToDeadLine(timeToDeadline)}
        </Text>
      )}
    </View>
  );
};

export default BucketListItem;
