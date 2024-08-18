import { deleteCategory } from "@/lib/api/category";
import { categoriesState } from "@/lib/atom/categories";
import { drizzleDb } from "@/lib/db/db";
import { Category } from "@/lib/types/Category";
import { useSQLiteContext } from "expo-sqlite";
import { useSetRecoilState } from "recoil";

// ////////////////////////////////////////////////////////////////////////////////////////////////
// schema 定義

type UseDeleteCategoryModal = (args: { selectedCategory: Category; closeModal: () => void }) => {
  handleClickDeleteButton: () => Promise<void>;
};

// hooks 本体 ========================================================================================
export const useDeleteCategoryModal: UseDeleteCategoryModal = (args) => {
  const { selectedCategory, closeModal } = args;

  const handleClickDeleteButton = async () => {
    try {
      await deleteCategory(drizzleDb, selectedCategory.id);
    } catch (e) {
      console.log(e);
      throw e;
    }

    closeModal();
  };

  return {
    handleClickDeleteButton,
  };
};
