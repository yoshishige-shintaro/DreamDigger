import { TITLE_DATA_ITEMS, TitleDataItem, TitleName } from "@/lib/data/title";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";

type ProgressBarProps = {
  achievedCount: number;
  currentTitleData: TitleDataItem;
};

const ProgressBar = (props: ProgressBarProps) => {
  const { achievedCount, currentTitleData } = props;
  const isDreamDigger = currentTitleData.name === TitleName.DREAM_DIGGER;
  // 次の称号のデータ
  const nextTitleData = isDreamDigger
    ? TITLE_DATA_ITEMS[currentTitleData.index]
    : TITLE_DATA_ITEMS[currentTitleData.index + 1];

  // 次の称号までに必要な達成数
  const requiredNumber = nextTitleData.requiredAchieveCount - currentTitleData.requiredAchieveCount;

  // 次の称号までに必要な達成数のうち、現在達成している数
  const progressedNumber = achievedCount - currentTitleData.requiredAchieveCount;

  // 次の称号までの残り達成数
  const leftNumber = isDreamDigger ? 0 : requiredNumber - progressedNumber;

  // 達成している割合
  const rateOfProgress = isDreamDigger ? 100 : Number((progressedNumber / requiredNumber) * 100);

  //アニメーション
  const widthAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      const startAnimation = () => {
        widthAnim.setValue(0); // Reset the animation
        Animated.timing(widthAnim, {
          toValue: rateOfProgress, // 50% の幅にアニメーション
          duration: 1000, // 2秒間でアニメーション
          easing: Easing.inOut(Easing.ease), // ease-in effect
          useNativeDriver: false,
        }).start();
      };
      startAnimation();
    }, [widthAnim, rateOfProgress]),
  );

  return (
    <View className="mt-4 items-center">
      <Text className="text-lg font-medium">次の称号まであと {leftNumber} こ</Text>
      <View className="w-full bg-gray-300 h-8 rounded-full relative">
        <Animated.View
          style={[
            {
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
          className="absolute left-0 top-0 h-full bg-sky-300 rounded-full animate-fill"
        />
      </View>
    </View>
  );
};

export default ProgressBar;
