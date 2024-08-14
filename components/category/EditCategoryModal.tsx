import RhfTextInput from "@/components/common/RhfTextInput";
import { useEditCategoryModal } from "@/hooks/category/useEditCategoryModal";
import { Category } from "@/lib/types/Category";
import { Animated, Button, Pressable, Text, View } from "react-native";

type CategoryEditModalProps = {
  selectedCategory: Category;
  closeModal: () => void;
  slideAnim: Animated.Value;
};

const EditCategoryModal = (props: CategoryEditModalProps): JSX.Element => {
  const { closeModal, slideAnim } = props;
  const { control, onSubmit, isDisabledEditButton } = useEditCategoryModal(props);

  return (
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
          <Text className="text-lg font-bold">カテゴリ編集</Text>
        </View>

        <RhfTextInput control={control} name="categoryTitle" />

        <View className="mt-6 flex-row justify-center">
          <View className="flex-row justify-center items-center flex-1">
            <Button title="キャンセル" onPress={closeModal} />
          </View>
          <View className="flex-row justify-center items-center flex-1">
            <Button title="OK" onPress={onSubmit} disabled={isDisabledEditButton} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default EditCategoryModal;
