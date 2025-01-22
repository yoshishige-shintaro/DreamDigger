import AddBucketListItemButton from "@/components/bucketList/AddBucketListItemButton";
import RhfDatetimePicker from "@/components/common/RhfDatetimePicker";
import RhfPickerSelect from "@/components/common/RhfPickerSelect";
import RhfTextInput from "@/components/common/RhfTextInput";
import RhfToggleSwitch from "@/components/common/RhfToggleSwitch";
import { useAddBucketItemModal } from "@/hooks/bucketList/useAddBucketItemModal";
import { Category } from "@/lib/types/Category";
import React from "react";
import { Animated, Button, Pressable, Text, View } from "react-native";

type AddBucketListItemModalProps = {
  categories: Category[];
  currentCategoryId: string;
};

const AddBucketListItemModal = (props: AddBucketListItemModalProps) => {
  const { categories, currentCategoryId } = props;
  const { control, onSubmit, closeModal, openModal, slideAnim, isOpenModal, isRemind } =
    useAddBucketItemModal({ currentCategoryId });

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
            <View className="items-center justify-center">
              <Text className="text-lg font-bold">やりたいこと追加</Text>
            </View>
            <View>
              {/* やりたいこと */}
              <View className="mt-6">
                <RhfTextInput control={control} name="bucketItemTitle" label="やりたいこと" />
              </View>

              {/* カテゴリ */}
              <View className="mt-4">
                <RhfPickerSelect
                  control={control}
                  name="categoryId"
                  label="カテゴリ"
                  items={categories.map((category) => ({
                    label: category.title,
                    value: category.id,
                  }))}
                />
              </View>

              {/* 達成期限 */}
              <View className="mt-4">
                <RhfDatetimePicker control={control} name="deadline" label="達成期限" />
              </View>

              {/* リマインド設定 */}
              <View className="mt-4">
                {/* リマインドトグルボタン */}
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm">リマインド設定</Text>
                  <RhfToggleSwitch control={control} name="isRemind" />
                </View>
                {/* リマインド日時設定 */}
                <View className="mt-2">
                  <RhfDatetimePicker control={control} name="remindDate" />
                </View>
              </View>
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
