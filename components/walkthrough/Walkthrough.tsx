import DiggingIcon from "@/components/walkthrough/icon/DiggingIcon";
import LazingIcon from "@/components/walkthrough/icon/LazingIcon";
import StackingBoxesIcon from "@/components/walkthrough/icon/StackingBoxesIcon";
import { TINT_COLOR } from "@/constants/Colors";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Text, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width, height } = Dimensions.get("window");
const baseStyle = { width, height };

const Walkthrough = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <View className="flex-1">
      <SwiperFlatList
        showPagination
        paginationStyle={{ paddingBottom: 80 }}
        paginationActiveColor={TINT_COLOR}
        paginationDefaultColor="#ccc"
        onChangeIndex={({ index }) => setCurrentIndex(index)}
      >
        <AnimatedView triggerAnimation={currentIndex === 0}>
          <LazingIcon size={128} />
          <Text className="mt-12">やりたいことがない...</Text>
          <Text className="mt-4"> 一日中ダラダラ過ごしてしまった...</Text>
          <Text className="mt-4"> SNSを見てたら1日が終わった...</Text>
          <Text className="mt-4"> そんな経験はないでしょうか？</Text>
        </AnimatedView>
        <AnimatedView triggerAnimation={currentIndex === 1}>
          <StackingBoxesIcon size={128} />
          <Text className="mt-12">このアプリを使用すれば</Text>
          <Text className="mt-4">小さいやりたいことを積み重ねることで</Text>
          <Text className="mt-4">自分の中にあるやりたいことを発見できるようなります</Text>
        </AnimatedView>
        <AnimatedView triggerAnimation={currentIndex === 2}>
          <DiggingIcon size={128} />
          <Text className="mt-12">やりたいことはあなたの中に埋まっています</Text>
          <Text className="mt-4">やりたいことを発掘しにいきましょう！</Text>
          <Text className="mt-4">わっしょい！わっしょい！</Text>
        </AnimatedView>
      </SwiperFlatList>
    </View>
  );
};

export default Walkthrough;

// ふわっと出てくるアニメーション
const AnimatedView = ({
  children,
  triggerAnimation,
}: {
  children: React.ReactNode;
  triggerAnimation: boolean;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (triggerAnimation) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else if (!triggerAnimation) {
      // 表示されていないスライドはアニメーション前の状態にしておく
      fadeAnim.setValue(0);
    }
  }, [triggerAnimation]);

  const translateY = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <Animated.View
      className="items-center mt-[50%]"
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
        baseStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};
