import { useBucketListItem } from "@/hooks/bucketList/useBucketListItem";
import { useTheme } from "@/hooks/common/useTheme";
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

  const { theme } = useTheme();

  return (
    <View
      style={{
        shadowColor: theme.shadowColor,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 4 },
        backgroundColor: theme.bg.secondary,
      }}
      className={`flex-row justify-between items-center h-auto p-4 rounded-md mb-1 w-full`}
    >
      <View className="flex-row items-center">
        <CheckBox
          isChecked={isChecked}
          onClick={onClickCheckBox}
          checkBoxColor={theme.text.secondary}
          checkedCheckBoxColor={theme.accent.primary}
        />
        <View className="ml-2">
          <Pressable onPress={onClickCheckBox}>
            <Text
              className={`text-base w-60 ${isChecked ? `line-through` : ""}`}
              style={{
                color: isChecked ? theme.text.secondary : theme.text.primary,
              }}
            >
              {title}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* 期限までの残り時間 */}
      {!isEdit && (
        <Text
          className={`text-base ${
            isExpiredDeadline ? "text-rose-500" : `text-[${theme.text.primary}]`
          }`}
        >
          {displayTimeToDeadLine(timeToDeadline)}
        </Text>
      )}
    </View>
  );
};

export default BucketListItem;
