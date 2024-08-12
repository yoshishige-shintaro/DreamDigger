import { Feather } from "@expo/vector-icons";
import { TouchableHighlight, View } from "react-native";

export const IconOptions = {
  CHECK: "check",
  TRASH: "trash-2",
  PLUS: "plus",
} as const;

export type IconOptions = (typeof IconOptions)[keyof typeof IconOptions];

type CircleIconButtonProps = {
  icon: IconOptions;
  onPress: () => void;
};
const CircleIconButton = (props: CircleIconButtonProps) => {
  const { icon, onPress } = props;
  return (
    <View className="absolute bottom-10 right-10">
      <TouchableHighlight
        style={{
          shadowColor: "#000000",
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 8 },
        }}
        className="w-16 h-16 bg-sky-200 rounded-full justify-center items-center"
        onPress={onPress}
        underlayColor={"#e0f2fe"}
      >
        <Feather name={icon} size={48} color="#fff" />
      </TouchableHighlight>
    </View>
  );
};

export default CircleIconButton;
