import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import z from "zod";

// ////////////////////////////////////////////////////////////////////////////////////////////////
// schema 定義

const schema = z.object({
  bucketItemTitle: z.string().trim().min(1, { message: "入力してください" }),
  category: z.string().optional(),
  deadline: z.date(),
});

// schema から型を抽出
export type AddBucketItemFormInput = z.infer<typeof schema>;

type UseAddBucketItemModal = () => {
  control: Control<AddBucketItemFormInput>;
};

// hooks 本体 ========================================================================================
export const useAddBucketItemModal: UseAddBucketItemModal = () => {
  const defaultValues: AddBucketItemFormInput = {
    bucketItemTitle: "",
    category: undefined,
    deadline: new Date(),
  };

  // React Hook Form
  const { control, handleSubmit, watch } = useForm<AddBucketItemFormInput>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  return {
    control,
  };
};
