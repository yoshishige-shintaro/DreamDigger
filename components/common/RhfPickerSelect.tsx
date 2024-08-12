import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

type InputProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
  items: { label: string; value: string }[];
};

const RhfPickerSelect = <T extends FieldValues>(props: InputProps<T>): JSX.Element => {
  const { name, control, label, items } = props;

  const {
    field: { onChange },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <View className="gap-2 mt-6">
      {label && <Text className="text-sm">{label}</Text>}
      <View>
        <RNPickerSelect
          onValueChange={(value: string) => onChange(value)}
          items={items}
          placeholder={{ label: "未選択", value: "" }}
          style={{
            viewContainer: {
              borderColor: "#ccc",
              borderWidth: 1,
              paddingHorizontal: 16,
              paddingVertical: 8,
            },
          }}
        />
      </View>

      {error && (
        <Text className="mt-1 text-rose-400">
          <ErrorMessage errors={error} name={name} />
        </Text>
      )}
    </View>
  );
};

export default RhfPickerSelect;
