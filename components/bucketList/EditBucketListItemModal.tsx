import AchieveBucketListItemButton from "@/components/bucketList/AchieveBucketListItemButton";
import BucketListItem from "@/components/bucketList/BucketListItem";
import DeleteBucketListItemButton from "@/components/bucketList/DeleteBucketListItemButton";
import { EditTypeValues, useEditBucketItemModal } from "@/hooks/bucketList/useEditBucketItemModal";
import { useTheme } from "@/hooks/common/useTheme";
import React from "react";
import { Animated, Button, FlatList, Pressable, Text, View } from "react-native";

const EditBucketListItemModal = () => {
  const {
    handleClickEditButton,
    closeModal,
    openModal,
    slideAnim,
    isOpenModal,
    selectedBucketItemsInModal,
    isDisabledDeleteButton,
    editType,
  } = useEditBucketItemModal();

  const { theme } = useTheme();

  return (
    <>
      <DeleteBucketListItemButton openModal={() => openModal(EditTypeValues.DELETE)} />
      <AchieveBucketListItemButton openModal={() => openModal(EditTypeValues.ACHIEVE)} />
      {isOpenModal && (
        <View className="absolute w-screen h-full flex-row justify-center items-center ">
          {/* オーバーレイ */}
          <Pressable
            onPress={closeModal}
            className="absolute top-0 left-0 w-screen h-full bg-black opacity-20"
          />
          <Animated.View
            className={`flex-1 mx-4  bg-gray-100 rounded-xl py-8 px-4`}
            style={[
              { transform: [{ translateY: slideAnim }], backgroundColor: theme.bg.secondary },
            ]}
          >
            <View className="items-center justify-center mb-8">
              {editType === EditTypeValues.DELETE ? (
                <Text className="text-lg font-bold" style={{ color: theme.text.primary }}>
                  やりたいこと削除
                </Text>
              ) : (
                <Text className="text-lg font-bold" style={{ color: theme.text.primary }}>
                  やりたいこと達成
                </Text>
              )}
            </View>
            <View className="max-h-[70%]">
              <FlatList
                data={selectedBucketItemsInModal}
                style={{ backgroundColor: theme.bg.primary, padding: 8 }}
                renderItem={({ item }) => {
                  return (
                    <BucketListItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      deadline={item.deadline}
                      notificationId={item.notificationId}
                      isEdit
                    />
                  );
                }}
              />
            </View>
            <View className="mt-6 flex-row justify-center">
              <View className="flex-row justify-center items-center flex-1">
                <Button title="キャンセル" onPress={closeModal} />
              </View>
              <View className="flex-row justify-center items-center flex-1">
                <Button
                  title={editType === EditTypeValues.DELETE ? "削除" : "達成！！"}
                  onPress={handleClickEditButton}
                  disabled={isDisabledDeleteButton}
                  color={editType === EditTypeValues.DELETE ? "red" : ""}
                />
              </View>
            </View>
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default EditBucketListItemModal;
