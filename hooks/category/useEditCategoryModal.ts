import { categoriesState } from "@/lib/atom/categories";
import { Category, RawCategory } from "@/lib/types/Category";
import { TableValue } from "@/lib/utils/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import z from "zod";

// ////////////////////////////////////////////////////////////////////////////////////////////////
// schema 定義

const schema = z.object({
  categoryTitle: z.string().trim().min(1, { message: "カテゴリ名を入力してください" }),
});

// schema から型を抽出
export type EditCategoryFormInput = z.infer<typeof schema>;

type UseEditCategoryModal = (args: { selectedCategory: Category; closeModal: () => void }) => {
  control: Control<EditCategoryFormInput>;
  onSubmit: () => Promise<void>;
  isDisabledEditButton: boolean;
};

// hooks 本体 ========================================================================================
export const useEditCategoryModal: UseEditCategoryModal = (args) => {
  const { selectedCategory, closeModal } = args;
  const setCategories = useSetRecoilState(categoriesState);

  const defaultValues: EditCategoryFormInput = {
    categoryTitle: selectedCategory.title,
  };

  // React Hook Form
  const { control, handleSubmit, reset, setValue, watch } = useForm<EditCategoryFormInput>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  // FIXME:なぜかdefaultValue だと表示切り替わらないので useEffect を使っている
  useEffect(() => {
    setValue("categoryTitle", selectedCategory.title);
  }, [selectedCategory]);

  const db = useSQLiteContext();
  const handleClickEditButton = async (data: EditCategoryFormInput) => {
    try {
      await db.execAsync(
        `UPDATE ${TableValue.CATEGORY_TABLE} SET title = '${data.categoryTitle}' WHERE uuid = '${selectedCategory.id}'`,
      );
      const categoriesRes = (await db.getAllAsync(
        `SELECT * FROM ${TableValue.CATEGORY_TABLE}`,
      )) as RawCategory[];
      setCategories(categoriesRes.map((r) => new Category(r)));
    } catch (e) {
      console.log("ERROR!!!");
      console.log(e);
      return;
    }

    console.log("カテゴリ名を編集しました");
    reset();
    closeModal();
  };

  return {
    control,
    onSubmit: handleSubmit(handleClickEditButton),
    isDisabledEditButton: defaultValues.categoryTitle === watch("categoryTitle"),
  };
};
