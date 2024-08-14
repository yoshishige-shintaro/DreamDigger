import { categoriesState } from "@/lib/atom/categories";
import { Category, RawCategory } from "@/lib/types/Category";
import { TableValue } from "@/lib/utils/table";
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
  const setCategories = useSetRecoilState(categoriesState);

  const db = useSQLiteContext();
  const handleClickDeleteButton = async () => {
    try {
      await db.execAsync("BEGIN TRANSACTION");

      await db.execAsync(
        `DELETE FROM ${TableValue.CATEGORY_TABLE} WHERE uuid = '${selectedCategory.id}'`,
      );
      await db.execAsync(
        `UPDATE ${TableValue.BUCKET_ITEMS_TABLE} SET category_id = null WHERE category_id = '${selectedCategory.id}'`,
      );
      // トランザクション終了
      await db.execAsync("COMMIT");
      const categoriesRes = (await db.getAllAsync(
        `SELECT * FROM ${TableValue.CATEGORY_TABLE}`,
      )) as RawCategory[];
      setCategories(categoriesRes.map((r) => new Category(r)));
    } catch (e) {
      // ロールバック
      await db.execAsync("ROLLBACK");
      console.log("ERROR!!!");
      console.log(e);
      return;
    }

    console.log("カテゴリを削除しました");
    closeModal();
  };

  return {
    handleClickDeleteButton,
  };
};
