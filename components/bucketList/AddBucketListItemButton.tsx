import CircleIconButton from "@/components/bucketList/parts/CircleIconButton";
import { selectedBucketListItemState } from "@/lib/atom/selectedBucketListItem";
import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { Easing } from "react-native-reanimated";

import { useRecoilValue } from "recoil";

const AddBucketListItemButton = (props: { openModal: () => void }): JSX.Element => {
  const selectedItems = useRecoilValue(selectedBucketListItemState);

  const slideUp = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (selectedItems.length !== 0) {
      Animated.timing(slideUp, {
        toValue: 150,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [selectedItems]);
  return (
    <CircleIconButton
      icon="plus"
      onPress={props.openModal}
      animationStyle={{ transform: [{ translateY: slideUp }] }}
      bottom={10}
      right={10}
    />
  );
};

export default AddBucketListItemButton;
