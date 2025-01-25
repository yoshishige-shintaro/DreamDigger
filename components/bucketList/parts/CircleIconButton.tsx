import { useTheme } from "@/hooks/common/useTheme";
import { Feather } from "@expo/vector-icons";

import { Animated, TouchableHighlight, ViewStyle } from "react-native";

export const IconOptions = {
  CHECK: "check",
  TRASH: "trash-2",
  PLUS: "plus",
} as const;

export type IconOptions = (typeof IconOptions)[keyof typeof IconOptions];

type CircleIconButtonProps = {
  icon: IconOptions;
  onPress: () => void;
  animationStyle: ViewStyle;
};
const CircleIconButton = (props: CircleIconButtonProps) => {
  const { icon, onPress, animationStyle } = props;
  const { theme } = useTheme();
  return (
    <Animated.View
      style={animationStyle}
      className={`absolute ${icon === IconOptions.TRASH ? "bottom-28" : "bottom-10"}  right-5`}
    >
      <TouchableHighlight
        style={{
          shadowColor: theme.shadowColor,
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 8 },
          backgroundColor: icon === IconOptions.TRASH ? "#ef4444" : theme.accent.primary,
        }}
        className={`w-16 h-16 rounded-full justify-center items-center`}
        onPress={onPress}
        underlayColor={icon === IconOptions.TRASH ? "#fecaca" : "#e0f2fe"}
      >
        <Feather name={icon} size={48} color={"#fff"} />
      </TouchableHighlight>
    </Animated.View>
  );
};

export default CircleIconButton;
