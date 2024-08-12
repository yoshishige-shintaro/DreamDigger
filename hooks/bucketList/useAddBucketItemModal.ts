import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import z from "zod";

// ////////////////////////////////////////////////////////////////////////////////////////////////
// schema 定義

const schema = z.object({
  bucketItemTitle: z.string().trim().min(1, { message: "やりたいことを入力してください" }),
  category: z.string().optional(),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "未来の日時を設定してください",
  }),
});

// schema から型を抽出
export type AddBucketItemFormInput = z.infer<typeof schema>;

type UseAddBucketItemModal = (args: { closeModal: () => void }) => {
  control: Control<AddBucketItemFormInput>;
  onSubmit: () => Promise<void>;
};

// hooks 本体 ========================================================================================
export const useAddBucketItemModal: UseAddBucketItemModal = (args) => {
  const { closeModal } = args;
  const defaultValues: AddBucketItemFormInput = {
    bucketItemTitle: "",
    category: undefined,
    deadline: new Date(),
  };

  // React Hook Form
  const { control, handleSubmit } = useForm<AddBucketItemFormInput>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handleClickAddButton = async (data: AddBucketItemFormInput) => {
    console.log(data);
    closeModal();
  };

  return {
    control,
    onSubmit: handleSubmit(handleClickAddButton),
  };
};
