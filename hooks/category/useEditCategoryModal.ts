import { editCategoryTitle } from "@/lib/api/category";
import { drizzleDb } from "@/lib/db/db";
import { Category } from "@/lib/types/Category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import z from "zod";

// ////////////////////////////////////////////////////////////////////////////////////////////////
// schema 定義

const schema = z.object({
  categoryTitle: z
    .string()
    .trim()
    .min(1, { message: "カテゴリ名を入力してください" })
    .max(25, { message: "25文字以下で入力してください" }),
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

  const handleClickEditButton = async (data: EditCategoryFormInput) => {
    try {
      await editCategoryTitle(drizzleDb, selectedCategory.id, data.categoryTitle);
    } catch (e) {
      console.log(e);
      throw e;
    }

    reset();
    closeModal();
  };

  return {
    control,
    onSubmit: handleSubmit(handleClickEditButton),
    isDisabledEditButton: defaultValues.categoryTitle === watch("categoryTitle"),
  };
};
