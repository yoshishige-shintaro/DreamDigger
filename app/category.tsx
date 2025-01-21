import AddCategoryModal from "@/components/category/AddCategoryModal";
import DeleteCategoryModal from "@/components/category/DeleteCategoryModal";
import EditCategoryModal from "@/components/category/EditCategoryModal";
import { View } from "@/components/common/Themed";
import { BASE_COLOR } from "@/constants/Colors";
import { ModalType, useCategoryScreen } from "@/hooks/category/useCategoryScree";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Stack, useNavigation } from "expo-router";

import { Pressable, Text } from "react-native";

export default function CategoryScreen() {
  const {
    categories,
    closeModal,
    isOpenModal,
    handleClickEditButton,
    handleClickDeleteButton,
    handleClickAddButton,
    modalType,
    selectedCategory,
    slideAnim,
  } = useCategoryScreen();

  const navigation = useNavigation()

  // TODO：カテゴリの並べ替え

  return (
    <>
      {/* ヘッダーの設定 */}
      <Stack.Screen
        options={{
          headerTitle: "カテゴリ管理",
          headerLeft: () => (
              <Pressable onPress={()=>{navigation.goBack()}} >
                {({ pressed }) => (
                  <View className="flex-row bg-sky-200" style={{ opacity: pressed ? 0.5 : 1 }}>
                    <AntDesign name="left" size={24} color="white" />
                    <Text className="text-white font-bold text-base ">戻る</Text>
                  </View>
                )}
              </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={handleClickAddButton}>
              {({ pressed }) => (
                <View style={{ opacity: pressed ? 0.5 : 1, backgroundColor: BASE_COLOR }}>
                  <Feather name="plus" size={24} color="white" />
                </View>
              )}
            </Pressable>
          ),
        }}
      />
      {categories.length === 0 ? (
        <View className="flex-1 justify-center items-center gap-4">
          <MaterialCommunityIcons name="yoga" size={72} color="gray" />
          <Text className="text-base text-gray-500">カテゴリが登録されていません</Text>
        </View>
      ) : (
        <View className="flex-1 bg-gray-100 px-4 py-8 ">
          {categories.map((category) => (
            <View
              key={category.id}
              style={{
                shadowColor: "#000000",
                shadowOpacity: 0.1,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 4 },
              }}
              className="flex-row justify-between items-center bg-white h-auto p-4 rounded-md mb-1"
            >
              <Pressable
                onPress={() => {
                  handleClickEditButton(category);
                }}
              >
                {({ pressed }) => (
                  <View className={`flex-row gap-2 items-center ${pressed ? "opacity-50" : ""}`}>
                    <Feather name="edit-2" size={24} color="black" />
                    <Text className="text-base  w-[80%]">
                      {category.title}
                    </Text>
                  </View>
                )}
              </Pressable>

              <Pressable
                onPress={() => {
                  handleClickDeleteButton(category);
                }}
              >
                {({ pressed }) => (
                  <View className={`${pressed ? "opacity-50" : ""}`}>
                    <Feather name="trash-2" size={24} color="red" />
                  </View>
                )}
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {/* TODO:モーダル共通化できそう */}
      {/* カテゴリ名編集モーダル */}
      {isOpenModal && selectedCategory && modalType === ModalType.EDIT && (
        <EditCategoryModal
          selectedCategory={selectedCategory}
          closeModal={closeModal}
          slideAnim={slideAnim}
        />
      )}
      {/* カテゴリ削除モーダル */}
      {isOpenModal && selectedCategory && modalType === ModalType.DELETE && (
        <DeleteCategoryModal
          selectedCategory={selectedCategory}
          closeModal={closeModal}
          slideAnim={slideAnim}
        />
      )}
      {/* カテゴリ追加モーダル */}
      {isOpenModal && modalType === ModalType.ADD && (
        <AddCategoryModal closeModal={closeModal} slideAnim={slideAnim} />
      )}
    </>
  );
}
