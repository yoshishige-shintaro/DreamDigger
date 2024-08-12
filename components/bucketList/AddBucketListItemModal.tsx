import RhfPickerSelect from "@/components/common/RhfPickerSelect";
import RhfTextInput from "@/components/common/RhfTextInput";
import { useAddBucketItemModal } from "@/hooks/bucketList/useAddBucketItemModal";
import React from "react";
import { Animated, Pressable, View } from "react-native";

const AddBucketListItemModal = (props: {
  isOpen: boolean;
  slideAnim: Animated.Value;
  closeModal: () => void;
  categories: string[];
}) => {
  const { closeModal, slideAnim, categories } = props;
  const { control } = useAddBucketItemModal();

  return (
    <View className="absolute w-screen h-full flex-row justify-center items-center ">
      {/* オーバーレイ */}
      <Pressable
        onPress={closeModal}
        className="absolute top-0 left-0 w-screen h-full bg-black opacity-20"
      />
      <Animated.View
        className={`flex-1 mx-4  bg-white  rounded-xl`}
        style={[{ transform: [{ translateY: slideAnim }] }]}
      >
        <View className="py-8 px-4">
          <RhfTextInput control={control} name="bucketItemTitle" label="やりたいこと" />
          <RhfPickerSelect
            control={control}
            name="category"
            label="カテゴリ"
            items={categories.slice(1, 3).map((category) => ({ label: category, value: category }))}
          />
        </View>

        {/* <Button onPress={closeModal} title="閉じる" /> */}
      </Animated.View>
    </View>
  );
};

export default AddBucketListItemModal;
