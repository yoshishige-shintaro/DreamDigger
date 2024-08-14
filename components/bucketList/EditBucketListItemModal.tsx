import AchieveBucketListItemButton from "@/components/bucketList/AchieveBucketListItemButton";
import BucketListItem from "@/components/bucketList/BucketListItem";
import DeleteBucketListItemButton from "@/components/bucketList/DeleteBucketListItemButton";
import {
  EditTypeValues,
  useEditBucketItemModal,
} from "@/hooks/bucketList/useEditBucketItemModal";
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
            className={`flex-1 mx-4  bg-gray-100 rounded-xl py-8 px-8`}
            style={[{ transform: [{ translateY: slideAnim }] }]}
          >
            <View className="items-center justify-center mb-8">
              {editType === EditTypeValues.DELETE ? (
                <Text className="text-lg font-bold">やりたいこと削除</Text>
              ) : (
                <Text className="text-lg font-bold">やりたいこと達成</Text>
              )}
            </View>
            <View>
              <FlatList
                data={selectedBucketItemsInModal}
                renderItem={({ item }) => {
                  return (
                    <BucketListItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      deadline={item.deadline}
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
                  title={editType === EditTypeValues.DELETE ? "削除する" : "達成済み"}
                  onPress={handleClickEditButton}
                  disabled={isDisabledDeleteButton}
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
