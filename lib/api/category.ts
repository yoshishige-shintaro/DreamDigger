import { DrizzleDb } from "@/lib/db/db";
import { categorySchema } from "@/lib/db/schema";
import { RawCategory } from "@/lib/types/Category";
import { eq } from "drizzle-orm";

// カテゴリ一覧取得
// FIXME 多分使わない
export const getCategories = async (drizzleDb: DrizzleDb): Promise<RawCategory[]> => {
  const rawCategories = await drizzleDb.select().from(categorySchema);
  return rawCategories;
};

// カテゴリ追加
export const addCategory = async (drizzleDb: DrizzleDb, body: RawCategory): Promise<void> => {
  await drizzleDb.insert(categorySchema).values(body);
};

// バケットアイテムの削除
export const deleteCategory = async (drizzleDb: DrizzleDb, categoryId: string): Promise<void> => {
  await drizzleDb.delete(categorySchema).where(eq(categorySchema.uuid, categoryId));
};
