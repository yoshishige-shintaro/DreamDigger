import React from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

type InputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextInputProps, "autoComplete"> & { label?: string };

const RhfTextInput = <T extends FieldValues>(props: InputProps<T>): JSX.Element => {
  const { name, className, control, label, ...inputAttributes } = props;

  const {
    field: { ref: _, onChange, ...restField },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <View className="gap-2">
      {label && <Text className="text-sm">{label}</Text>}
      <TextInput
        onChangeText={(value) => onChange(value)}
        {...inputAttributes}
        {...restField}
        className={`rounded border px-4 py-2 outline-none focus:border-cyan-300 ${
          error ? "border-error" : "border-gray-300"
        } ${className}`}
      />
      {error && (
        <Text className="mt-1 text-rose-700">
          <Text>{error.message}</Text>
        </Text>
      )}
    </View>
  );
};

export default RhfTextInput;
