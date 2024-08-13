import { formatDate } from "@/lib/utils/date";
import React, { useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type InputProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
};

const RhfDatetimePicker = <T extends FieldValues>(props: InputProps<T>): JSX.Element => {
  const { name, control, label } = props;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View className="gap-2 mt-6">
      {label && <Text className="text-sm">{label}</Text>}
      <Pressable onPress={showDatePicker} onBlur={hideDatePicker}>
        <View
          className={`rounded border px-4 py-2 outline-none focus:border-cyan-300 ${
            error ? "border-rose-700" : "border-gray-300"
          }`}
        >
          <Text>{formatDate(value)}</Text>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          confirmTextIOS="決定"
          cancelTextIOS="キャンセル"
          locale="ja"
        />
      </Pressable>
      {error && (
        <Text className="mt-1 text-rose-700">
          <Text>{error.message}</Text>
        </Text>
      )}
    </View>
  );
};

export default RhfDatetimePicker;
