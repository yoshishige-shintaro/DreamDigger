import { categoriesState } from "@/lib/atom/categories";
import { Category, RawCategory } from "@/lib/types/Category";
import { TableValue } from "@/lib/utils/table";
import { createUuid } from "@/lib/utils/uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSQLiteContext } from "expo-sqlite";
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

  const db = useSQLiteContext();
  const handleClickEditButton = async (data: AddCategoryFormInput) => {
    try {
      // TODO:SQLの書き方をちゃんとする(https://docs.expo.dev/versions/latest/sdk/sqlite/)
      await db.runAsync(
        `INSERT INTO ${TableValue.CATEGORY_TABLE} (uuid, title) VALUES (?,?)`,
        createUuid(),
        data.categoryTitle,
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

    console.log("カテゴリを追加しました");
    reset();
    closeModal();
  };

  return {
    control,
    onSubmit: handleSubmit(handleClickEditButton),
  };
};
