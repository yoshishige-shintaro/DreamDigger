import EditCategoryModal from "@/components/category/EditCategoryModal";
import { View } from "@/components/common/Themed";
import { useCategoryScreen } from "@/hooks/category/useCategoryScree";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export default function CategoryScreen() {
  const {
    categories,
    closeModal,
    isOpenModal,
    handleClickEditButton,
    modalType,
    selectedCategory,
    slideAnim,
  } = useCategoryScreen();

  return (
    <>
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
            className="flex-row justify-between items-center bg-white h-16 p-4 rounded-md mb-1"
          >
            <Pressable
              onPress={() => {
                handleClickEditButton(category);
              }}
            >
              {({ pressed }) => (
                <View className={`flex-row gap-2 ${pressed ? "opacity-50" : ""}`}>
                  <Feather name="edit-2" size={24} color="black" />
                  <Text className="text-base">{category.title}</Text>
                </View>
              )}
            </Pressable>

            <Pressable>
              {({ pressed }) => (
                <View className={`${pressed ? "opacity-50" : ""}`}>
                  <Feather name="trash-2" size={24} color="red" />
                </View>
              )}
            </Pressable>
          </View>
        ))}
      </View>
      {/* カテゴリ名編集モーダル */}
      {isOpenModal && modalType && selectedCategory && (
        <EditCategoryModal
          selectedCategory={selectedCategory}
          closeModal={closeModal}
          slideAnim={slideAnim}
        />
      )}
    </>
  );
}
