import { TINT_COLOR } from "@/constants/Colors";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { Switch } from "react-native";

type RhfToggleSwitchProps<T extends FieldValues> = UseControllerProps<T>;

const RhfToggleSwitch = <T extends FieldValues>(props: RhfToggleSwitchProps<T>): JSX.Element => {
  const { name, control } = props;
  const {
    field: { onChange, value },
  } = useController({ control, name });

  return (
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ true: TINT_COLOR, false: "#f4f3f4" }}
    />
  );
};

export default RhfToggleSwitch;
