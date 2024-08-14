import { useDeleteCategoryModal } from "@/hooks/category/useDeleteCategoryModal";
import { Category } from "@/lib/types/Category";
import { Animated, Button, Pressable, Text, View } from "react-native";

type DeleteCategoryModalProps = {
  selectedCategory: Category;
  closeModal: () => void;
  slideAnim: Animated.Value;
};

const DeleteCategoryModal = (props: DeleteCategoryModalProps): JSX.Element => {
  const { closeModal, slideAnim, selectedCategory } = props;
  const { handleClickDeleteButton } = useDeleteCategoryModal(props);

  return (
    <View className="absolute w-screen h-full flex-row justify-center items-center ">
      {/* オーバーレイ */}
      <Pressable
        onPress={closeModal}
        className="absolute top-0 left-0 w-screen h-full bg-black opacity-20"
      />
      <Animated.View
        className={`flex-1 mx-4  bg-gray-100 rounded-xl py-8 px-12 items-center`}
        style={[{ transform: [{ translateY: slideAnim }] }]}
      >
        <View className=" mb-8">
          <Text className="text-lg font-bold">カテゴリ削除</Text>
        </View>

        <Text className="text-base">「{selectedCategory.title}」を削除しますか？</Text>

        <View className="mt-6 flex-row justify-center">
          <View className="flex-row justify-center items-center flex-1">
            <Button title="キャンセル" onPress={closeModal} />
          </View>
          <View className="flex-row justify-center items-center flex-1">
            <Button title="削除" onPress={handleClickDeleteButton} color={"red"} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default DeleteCategoryModal;
