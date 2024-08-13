import AddBucketListItemButton from "@/components/bucketList/AddBucketListItemButton";
import RhfDatetimePicker from "@/components/common/RhfDatetimePicker";
import RhfPickerSelect from "@/components/common/RhfPickerSelect";
import RhfTextInput from "@/components/common/RhfTextInput";
import { useAddBucketItemModal } from "@/hooks/bucketList/useAddBucketItemModal";
import { Category } from "@/lib/types/Category";
import React from "react";
import { Animated, Button, Pressable, Text, View } from "react-native";

type AddBucketListItemModalProps = {
  categories: Category[];
};

const AddBucketListItemModal = (props: AddBucketListItemModalProps) => {
  const { categories } = props;
  const { control, onSubmit, closeModal, openModal, slideAnim, isOpenModal } =
    useAddBucketItemModal();

  return (
    <>
      <AddBucketListItemButton openModal={openModal} />
      {isOpenModal && (
        <View className="absolute w-screen h-full flex-row justify-center items-center ">
          {/* オーバーレイ */}
          <Pressable
            onPress={closeModal}
            className="absolute top-0 left-0 w-screen h-full bg-black opacity-20"
          />
          <Animated.View
            className={`flex-1 mx-4  bg-gray-100 rounded-xl py-8 px-12`}
            style={[{ transform: [{ translateY: slideAnim }] }]}
          >
            <View className="items-center justify-center mb-8">
              <Text className="text-lg font-bold">やりたいこと追加</Text>
            </View>
            <View>
              <RhfTextInput control={control} name="bucketItemTitle" label="やりたいこと" />
              <RhfPickerSelect
                control={control}
                name="categoryId"
                label="カテゴリ"
                items={categories.map((category) => ({
                  label: category.title,
                  value: category.id,
                }))}
              />
              <RhfDatetimePicker control={control} name="deadline" label="達成期限" />
            </View>

            <View className="mt-6 flex-row justify-center">
              <View className="flex-row justify-center items-center flex-1">
                <Button title="キャンセル" onPress={closeModal} />
              </View>
              <View className="flex-row justify-center items-center flex-1">
                <Button title="追加する" onPress={onSubmit} />
              </View>
            </View>

            {/* <Button onPress={closeModal} title="閉じる" /> */}
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default AddBucketListItemModal;
