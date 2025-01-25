import AddBucketListItemButton from "@/components/bucketList/AddBucketListItemButton";
import RhfDatetimePicker from "@/components/common/RhfDatetimePicker";
import RhfPickerSelect from "@/components/common/RhfPickerSelect";
import RhfTextInput from "@/components/common/RhfTextInput";
import RhfToggleSwitch from "@/components/common/RhfToggleSwitch";
import { useAddBucketItemModal } from "@/hooks/bucketList/useAddBucketItemModal";
import { useTheme } from "@/hooks/common/useTheme";
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

  const { theme } = useTheme();

  return (
    <>
      <AddBucketListItemButton openModal={openModal} />
      {isOpenModal && (
        <View className="absolute w-screen h-full flex-row justify-center items-center ">
          {/* オーバーレイ */}
          <Pressable
            onPress={closeModal}
            className={`absolute top-0 left-0 w-screen h-full opacity-20`}
            style={{
              backgroundColor: theme.bg.secondary,
            }}
          />
          <Animated.View
            className={`flex-1 mx-4 rounded-xl py-8 px-12`}
            style={[
              { transform: [{ translateY: slideAnim }], backgroundColor: theme.bg.secondary },
            ]}
          >
            <View className="items-center justify-center">
              <Text className={`font-bold text-lg`} style={{ color: theme.text.primary }}>
                やりたいこと追加
              </Text>
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
                  <Text className="text-sm" style={{ color: theme.text.primary }}>
                    リマインド設定
                  </Text>
                  <RhfToggleSwitch control={control} name="isRemind" />
                </View>
                {/* リマインド日時設定 */}

                <View className="mt-3">
                  <RhfDatetimePicker control={control} disabled={!isRemind} name="remindDate" />
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
