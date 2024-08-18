import { AddBucketItemFormInput } from "@/hooks/bucketList/useAddBucketItemModal";
import { DrizzleDb } from "@/lib/db/db";
import { bucketItemsSchema } from "@/lib/db/schema";
import { RawBucketItem, StatusValue } from "@/lib/types/BucketItem";
import { createUuid } from "@/lib/utils/uuid";
import { asc, inArray } from "drizzle-orm";

// やりたいことリスト一覧取得(
//FIXME:多分使わない)
export const getBucketItems = async (drizzleDb: DrizzleDb): Promise<RawBucketItem[]> => {
  const rawBucketItem = await drizzleDb
    .select()
    .from(bucketItemsSchema)
    .orderBy(asc(bucketItemsSchema.deadline));
  return rawBucketItem;
};

// やりたいこと追加
export const addBucketItem = async (
  drizzleDb: DrizzleDb,
  data: AddBucketItemFormInput,
): Promise<void> => {
  const body = {
    uuid: createUuid(),
    createdAt: new Date(),
    deadline: data.deadline,
    achievedAt: null,
    categoryId: data.categoryId ?? null,
    status: StatusValue.DURING_CHALLENGE,
    title: data.bucketItemTitle,
  };
  console.log("INSERT");

  await drizzleDb.insert(bucketItemsSchema).values(body);
};

// やりたいことの複数追加(（初期値を挿入する時にしか使わない）
export const addBucketItems = async (
  drizzleDb: DrizzleDb,
  data: AddBucketItemFormInput[],
): Promise<void> => {
  const body = data.map((d) => ({
    uuid: createUuid(),
    createdAt: new Date(),
    deadline: d.deadline,
    achievedAt: null,
    categoryId: d.categoryId ?? null,
    status: StatusValue.DURING_CHALLENGE,
    title: d.bucketItemTitle,
  }));
  await drizzleDb.insert(bucketItemsSchema).values(body);
};

// バケットアイテムの削除
export const deleteBucketItems = async (drizzleDb: DrizzleDb, bucketItemIds: string[]) => {
  await drizzleDb.delete(bucketItemsSchema).where(inArray(bucketItemsSchema.uuid, bucketItemIds));
};

// バケットアイテムの達成
export const achievedBucketItems = async (drizzleDb: DrizzleDb, bucketItemIds: string[]) => {
  await drizzleDb
    .update(bucketItemsSchema)
    .set({ status: StatusValue.ACHIEVED })
    .where(inArray(bucketItemsSchema.uuid, bucketItemIds));
};
