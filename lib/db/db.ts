import { AddBucketItemFormInput } from "@/hooks/bucketList/useAddBucketItemModal";
import { addBucketItems } from "@/lib/api/bucketListItem";
import { addCategory } from "@/lib/api/category";
import { categorySchema } from "@/lib/db/schema";
import { createUuid } from "@/lib/utils/uuid";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase, openDatabaseSync } from "expo-sqlite";

export const DB_NAME = "dream_digger.db";

export const expoDb = openDatabaseSync(DB_NAME, { enableChangeListener: true });
export const drizzleDb = drizzle(expoDb);

// drizzle client のかた
export type DrizzleDb = typeof drizzleDb;

// 最初のマイグレーションかどうかを亜ツィかめる
const judgeIsInitMigration = async (): Promise<boolean> => {
  const categories = await drizzleDb.select().from(categorySchema);
  const isInitMigration = categories.length === 0;
  return isInitMigration;
};

const createDeadline = (minutes: number): Date => {
  return new Date(new Date().getTime() + minutes * 60000);
};

export const createInitData = async (db: SQLiteDatabase): Promise<void> => {
  const isInitMigration = await judgeIsInitMigration();
  // 初回マイグレーションではない場合
  if (!isInitMigration) {
    return; // 何もしない
  }

  const tutorialCategoryId = createUuid();
  await addCategory(drizzleDb, {
    uuid: tutorialCategoryId,
    isActive: true,
    title: "チュートリアル",
  });

  const tutorialBucketItems: AddBucketItemFormInput[] = [
    {
      bucketItemTitle: "「使い方」を見る",
      deadline: createDeadline(15),
      categoryId: tutorialCategoryId,
    },
    {
      bucketItemTitle: "やりたいことを追加する",
      deadline: createDeadline(15),
      categoryId: tutorialCategoryId,
    },
    {
      bucketItemTitle: "追加したやりたいことを達成する",
      deadline: createDeadline(30),
      categoryId: tutorialCategoryId,
    },
  ];
  await addBucketItems(drizzleDb, tutorialBucketItems);
};
