import AddCategoryModal from "@/components/category/AddCategoryModal";
import DeleteCategoryModal from "@/components/category/DeleteCategoryModal";
import EditCategoryModal from "@/components/category/EditCategoryModal";
import { View } from "@/components/common/Themed";
import { ModalType, useCategoryScreen } from "@/hooks/category/useCategoryScree";
import { useTheme } from "@/hooks/common/useTheme";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";

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

  const navigation = useNavigation();

  const { theme } = useTheme();

  // TODO：カテゴリの並べ替え
  return (
    <>
      {/* ヘッダーの設定 */}
      <Stack.Screen
        options={{
          headerTitle: "カテゴリ管理",
          contentStyle: {
            backgroundColor: theme.bg.primary,
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              {({ pressed }) => (
                <View className="flex-row bg-transparent" style={{ opacity: pressed ? 0.5 : 1 }}>
                  <AntDesign name="left" size={24} color="white" />
                  <Text className="text-white font-bold text-base ">戻る</Text>
                </View>
              )}
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={handleClickAddButton}>
              {({ pressed }) => (
                <View className="bg-transparent" style={{ opacity: pressed ? 0.5 : 1 }}>
                  <Feather name="plus" size={24} color="white" />
                </View>
              )}
            </Pressable>
          ),
        }}
      />
      {categories.length === 0 ? (
        <View className="flex-1 bg-transparent justify-center items-center gap-4">
          <MaterialCommunityIcons name="yoga" size={72} color="gray" />
          <Text className="text-base text-gray-500">カテゴリが登録されていません</Text>
        </View>
      ) : (
        <View className="flex-1 bg-transparent px-4 py-8 ">
          {categories.map((category) => (
            <View
              key={category.id}
              style={{
                shadowColor: theme.shadowColor,
                shadowOpacity: 0.1,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 4 },
                backgroundColor: theme.bg.secondary,
              }}
              className="flex-row justify-between items-center h-auto p-4 rounded-md mb-1"
            >
              <Pressable
                onPress={() => {
                  handleClickEditButton(category);
                }}
              >
                {({ pressed }) => (
                  <View
                    className={`flex-row bg-transparent gap-2 items-center ${
                      pressed ? "opacity-50" : ""
                    }`}
                  >
                    <Feather name="edit-2" size={24} color={theme.text.primary} />
                    <Text className="text-base  w-[80%]" style={{ color: theme.text.primary }}>
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
                  <View className={`bg-transparent ${pressed ? "opacity-50" : ""}`}>
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
