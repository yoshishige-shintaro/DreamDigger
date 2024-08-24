import DiggingIcon from "@/components/walkthrough/icon/DiggingIcon";
import LazingIcon from "@/components/walkthrough/icon/LazingIcon";
import StackingBoxesIcon from "@/components/walkthrough/icon/StackingBoxesIcon";
import { TINT_COLOR } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef } from "react";
import { Animated, Button, Dimensions, Text, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width, height } = Dimensions.get("window");
const baseStyle = { width, height };

type WalkthroughProps = {
  setIsOpenWalkthrough: React.Dispatch<React.SetStateAction<boolean | null>>;
};
const Walkthrough = (props: WalkthroughProps): JSX.Element => {
  const { setIsOpenWalkthrough } = props;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleClickNextBtn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsOpenWalkthrough(false);
      void AsyncStorage.setItem("isFirstVisit", JSON.stringify(false));
    });
  };

  return (
    <Animated.View
      className="flex-1 z-10 absolute top-0 left-0 bg-white"
      style={{ opacity: fadeAnim }}
    >
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
          <Text className="mt-4">自分がやりたいことを発見できるようなります</Text>
        </AnimatedView>
        <AnimatedView triggerAnimation={currentIndex === 2}>
          <DiggingIcon size={128} />
          <Text className="mt-12">やりたいことはあなたの中に埋まっています</Text>
          <Text className="mt-4">やりたいことを発掘しにいきましょう！</Text>
          <Text className="mt-4">わっしょい！わっしょい！</Text>
          <View className="mt-8">
            <Button title="すすむ" onPress={handleClickNextBtn} />
          </View>
        </AnimatedView>
      </SwiperFlatList>
    </Animated.View>
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
      className="items-center mt-[60%]"
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
