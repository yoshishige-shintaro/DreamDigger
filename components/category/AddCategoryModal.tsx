import RhfTextInput from "@/components/common/RhfTextInput";
import { useAddCategoryModal } from "@/hooks/category/useAddCategoryModal";
import { useTheme } from "@/hooks/common/useTheme";
import { Animated, Button, Pressable, Text, View } from "react-native";

type AddCategoryModalProps = {
  closeModal: () => void;
  slideAnim: Animated.Value;
};

const AddCategoryModal = (props: AddCategoryModalProps): JSX.Element => {
  const { closeModal, slideAnim } = props;
  const { control, onSubmit } = useAddCategoryModal({ closeModal });
  const { theme } = useTheme();

  return (
    <View className="absolute w-screen h-full flex-row justify-center items-center ">
      {/* オーバーレイ */}
      <Pressable
        onPress={closeModal}
        className="absolute top-0 left-0 w-screen h-full bg-black opacity-20"
      />
      <Animated.View
        className={`flex-1 mx-4  bg-gray-100 rounded-xl py-8 px-12`}
        style={[{ transform: [{ translateY: slideAnim }], backgroundColor: theme.bg.secondary }]}
      >
        <View className="items-center justify-center mb-8">
          <Text className="text-lg font-bold" style={{ color: theme.text.primary }}>
            カテゴリ追加
          </Text>
        </View>

        <RhfTextInput control={control} name="categoryTitle" label="カテゴリ名" />

        <View className="mt-6 flex-row justify-center">
          <View className="flex-row justify-center items-center flex-1">
            <Button title="キャンセル" onPress={closeModal} />
          </View>
          <View className="flex-row justify-center items-center flex-1">
            <Button title="追加" onPress={onSubmit} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default AddCategoryModal;
