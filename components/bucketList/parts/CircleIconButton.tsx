import { Feather } from "@expo/vector-icons";
import { Style } from "nativewind/dist/style-sheet/runtime";
import { Animated, TouchableHighlight } from "react-native";

export const IconOptions = {
  CHECK: "check",
  TRASH: "trash-2",
  PLUS: "plus",
} as const;

export type IconOptions = (typeof IconOptions)[keyof typeof IconOptions];

type CircleIconButtonProps = {
  icon: IconOptions;
  onPress: () => void;
  animationStyle: Style;
};
const CircleIconButton = (props: CircleIconButtonProps) => {
  const { icon, onPress, animationStyle } = props;
  return (
    <Animated.View
      style={animationStyle}
      className={`absolute ${icon === IconOptions.TRASH ? "bottom-28" : "bottom-10"}  right-5`}
    >
      <TouchableHighlight
        style={{
          shadowColor: "#000000",
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 8 },
        }}
        className={`w-16 h-16 bg-sky-200 rounded-full justify-center items-center ${
          icon === IconOptions.TRASH ? "bg-red-500" : ""
        }`}
        onPress={onPress}
        underlayColor={icon === IconOptions.TRASH ? "#fecaca" : "#e0f2fe"}
      >
        <Feather name={icon} size={48} color="#fff" />
      </TouchableHighlight>
    </Animated.View>
  );
};

export default CircleIconButton;
