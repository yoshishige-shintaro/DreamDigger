import { useTheme } from "@/hooks/common/useTheme";
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
    field: { onChange, value },
    fieldState: { error },
  } = useController({ control, name });

  const { theme, isDarkMode } = useTheme();

  return (
    <View className="gap-2">
      {label && (
        <Text className="text-sm" style={{ color: theme.text.primary }}>
          {label}
        </Text>
      )}
      <View>
        <RNPickerSelect
          value={value}
          onValueChange={(value: string) => onChange(value)}
          items={items}
          placeholder={{ label: "未選択", value: "" }}
          darkTheme={isDarkMode}
          style={{
            // 入力欄をタップしても Picker を開けるよにする設定
            inputIOSContainer: {
              pointerEvents: "none",
            },
            inputIOS: {
              color: theme.text.primary,
            },
            viewContainer: {
              borderColor: "#ccc",
              borderWidth: 1,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 4,
              backgroundColor: isDarkMode ? theme.bg.primary : "",
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
