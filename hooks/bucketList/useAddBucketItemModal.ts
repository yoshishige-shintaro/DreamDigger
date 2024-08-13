import { bucketListItemsState } from "@/lib/atom/bucketListItems";
import { BucketItem, RawBucketItem, StatusValue } from "@/lib/types/BucketItem";
import { SQLInsertBucketListItem } from "@/lib/utils/db";
import { createUuid } from "@/lib/utils/uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSQLiteContext } from "expo-sqlite";
import { Control, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import z from "zod";

// ////////////////////////////////////////////////////////////////////////////////////////////////
// schema 定義

const schema = z.object({
  bucketItemTitle: z.string().trim().min(1, { message: "やりたいことを入力してください" }),
  categoryId: z.string().optional(),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "未来の日時を設定してください",
  }),
});

// schema から型を抽出
export type AddBucketItemFormInput = z.infer<typeof schema>;

const buildBody = (data: AddBucketItemFormInput): RawBucketItem => ({
  uuid: createUuid(),
  created_at_iso_string: new Date().toISOString(),
  deadline_iso_string: data.deadline.toISOString(),
  achieved_at_iso_string: null,
  category_id: data.categoryId ?? null,
  status: StatusValue.DURING_CHALLENGE,
  title: data.bucketItemTitle,
});

type UseAddBucketItemModal = (args: { closeModal: () => void }) => {
  control: Control<AddBucketItemFormInput>;
  onSubmit: () => Promise<void>;
};

// hooks 本体 ========================================================================================
export const useAddBucketItemModal: UseAddBucketItemModal = (args) => {
  const { closeModal } = args;
  const setBucketItems = useSetRecoilState(bucketListItemsState);
  const defaultValues: AddBucketItemFormInput = {
    bucketItemTitle: "",
    categoryId: undefined,
    deadline: new Date(),
  };

  // React Hook Form
  const { control, handleSubmit } = useForm<AddBucketItemFormInput>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const db = useSQLiteContext();
  const handleClickAddButton = async (data: AddBucketItemFormInput) => {
    console.log(data.categoryId);

    try {
      await db.execAsync(SQLInsertBucketListItem(buildBody(data)));
      const bucketItemsRes = (await db.getAllAsync(
        "SELECT * FROM bucket_items",
      )) as RawBucketItem[];
      setBucketItems(bucketItemsRes.map((r) => new BucketItem(r)));
    } catch (e) {
      console.log("ERROR!!!");
      console.log(e);
      return;
    }
    console.log("やりたいこと追加しました");

    closeModal();
  };

  return {
    control,
    onSubmit: handleSubmit(handleClickAddButton),
  };
};
