import { addCategory } from "@/lib/api/category";
import { categoriesState } from "@/lib/atom/categories";
import { drizzleDb } from "@/lib/db/db";
import { RawCategory } from "@/lib/types/Category";
import { createUuid } from "@/lib/utils/uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import z from "zod";

// ////////////////////////////////////////////////////////////////////////////////////////////////
// schema 定義

const schema = z.object({
  categoryTitle: z.string().trim().min(1, { message: "カテゴリ名を入力してください" }),
});

// schema から型を抽出
export type AddCategoryFormInput = z.infer<typeof schema>;

type UseAddCategoryModal = (args: { closeModal: () => void }) => {
  control: Control<AddCategoryFormInput>;
  onSubmit: () => Promise<void>;
};

// hooks 本体 ========================================================================================
export const useAddCategoryModal: UseAddCategoryModal = (args) => {
  const { closeModal } = args;
  const setCategories = useSetRecoilState(categoriesState);

  const defaultValues: AddCategoryFormInput = {
    categoryTitle: "",
  };

  // React Hook Form
  const { control, handleSubmit, reset } = useForm<AddCategoryFormInput>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handleClickEditButton = async (data: AddCategoryFormInput) => {
    const body: RawCategory = {
      uuid: createUuid(),
      isActive: true,
      title: data.categoryTitle,
    };
    try {
      await addCategory(drizzleDb, body);
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
  };
};
