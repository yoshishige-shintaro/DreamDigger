import CircleIconButton from "@/components/bucketList/parts/CircleIconButton";
import { selectedBucketListItemState } from "@/lib/atom/selectedBucketListItem";
import { useEffect, useState } from "react";
import { Animated } from "react-native";

import { useRecoilValue } from "recoil";

const DeleteBucketListItemButton = (): JSX.Element => {
  const selectedItems = useRecoilValue(selectedBucketListItemState);

  const slideUp = useState(new Animated.Value(150))[0];

  useEffect(() => {
    if (selectedItems.length !== 0) {
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideUp, {
        toValue: 150,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedItems]);
  return (
    <CircleIconButton
      icon="trash-2"
      // onPress={props.openModal}
      onPress={() => {}}
      animationStyle={{ transform: [{ translateX: slideUp }] }}
    />
  );
};

export default DeleteBucketListItemButton;
