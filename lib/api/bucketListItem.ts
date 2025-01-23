import { DrizzleDb } from "@/lib/db/db";
import { bucketItemsSchema } from "@/lib/db/schema";
import { RawBucketItem, StatusValue } from "@/lib/types/BucketItem";
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
export const addBucketItem = async (drizzleDb: DrizzleDb, body: RawBucketItem): Promise<void> => {
  await drizzleDb.insert(bucketItemsSchema).values(body);
};

// やりたいことの複数追加(（初期値を挿入する時にしか使わない）
export const addBucketItems = async (
  drizzleDb: DrizzleDb,
  body: RawBucketItem[],
): Promise<void> => {
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
    .set({ status: StatusValue.ACHIEVED, achievedAt: new Date() })
    .where(inArray(bucketItemsSchema.uuid, bucketItemIds));
};
