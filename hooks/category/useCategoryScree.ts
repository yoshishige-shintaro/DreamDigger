import { categoriesState } from "@/lib/atom/categories";
import { Category } from "@/lib/types/Category";
import { useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";
import { useRecoilState } from "recoil";

export const ModalType = {
  DELETE: "delete",
  EDIT: "edit",
} as const;

type ModalType = (typeof ModalType)[keyof typeof ModalType];

type UseCategoryScreen = () => {
  categories: Category[];
  isOpenModal: boolean;
  closeModal: () => void;
  handleClickEditButton: (selectedCategory: Category) => void;
  handleClickDeleteButton: (category: Category) => void;
  modalType: ModalType;
  selectedCategory: Category | null;
  slideAnim: Animated.Value;
};

export const useCategoryScreen: UseCategoryScreen = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  // モーダル開閉処理 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.EDIT);
  const deviceHeight = Dimensions.get("window").height;
  const slideAnim = useRef(new Animated.Value(deviceHeight)).current; // 初期位置を設定

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: deviceHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOpenModal(false);
    });
  };
  const openModal = () => {
    setIsOpenModal(true);
    // モーダルを表示するアニメーション
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const handleClickEditButton = (category: Category) => {
    setSelectedCategory(category);
    openModal();
    setModalType(ModalType.EDIT);
  };
  const handleClickDeleteButton = (category: Category) => {
    setSelectedCategory(category);
    openModal();
    setModalType(ModalType.DELETE);
  };

  return {
    categories,
    closeModal,
    isOpenModal,
    openModal,
    handleClickEditButton,
    handleClickDeleteButton,
    modalType,
    selectedCategory,
    slideAnim,
  };
};
