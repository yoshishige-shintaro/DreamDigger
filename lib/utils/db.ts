import { StatusValue } from "@/lib/types/BucketItem";
import { INITIAL_CATEGORIES } from "@/lib/types/User";
import { TableValue } from "@/lib/utils/table";
import { createUuid } from "@/lib/utils/uuid";
import { type SQLiteDatabase } from "expo-sqlite";

// databaseName
export const DB_NAME = "dream_digger.db";

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  let currentDbVersion = result?.user_version ?? 0;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    const now = new Date();
    const thirtyMinutesLater = new Date(now.getTime() + 30 * 60 * 1000);
    // トランザクション開始
    try {
      await db.execAsync("PRAGMA journal_mode = 'wal';");
      await db.execAsync("BEGIN TRANSACTION");
      await db.execAsync(`
      CREATE TABLE ${TableValue.BUCKET_ITEMS_TABLE}(
                                uuid TEXT PRIMARY KEY NOT NULL,
                                title TEXT NOT NULL,
                                created_at_iso_string TEXT NOT NULL,
                                deadline_iso_string TEXT NOT NULL,
                                category TEXT,
                                status TEXT NOT NULL
                                );
      CREATE TABLE ${TableValue.USER_TABLE}(
                        categories TEXT
                        );
    `);
      await db.runAsync(
        `INSERT INTO ${TableValue.BUCKET_ITEMS_TABLE}(uuid, title, created_at_iso_string, deadline_iso_string, status, category) VALUES (?, ?, ?, ?, ?, ?),(?, ?, ?, ?, ?, ?)`,
        createUuid(),
        "読書10分",
        now.toISOString(),
        thirtyMinutesLater.toISOString(),
        StatusValue.DURING_CHALLENGE,
        INITIAL_CATEGORIES[0],
        createUuid(),
        "部屋の片付け",
        now.toISOString(),
        thirtyMinutesLater.toISOString(),
        StatusValue.DURING_CHALLENGE,
        INITIAL_CATEGORIES[1],
      );
      await db.runAsync(
        `INSERT INTO ${TableValue.USER_TABLE} (categories) VALUES (?)`,
        JSON.stringify(INITIAL_CATEGORIES),
      );

      // トランザクション終了
      await db.execAsync("COMMIT");
    } catch (e) {
      // ロールバック
      await db.execAsync("ROLLBACK");
      console.log("データベースの作成に失敗しました。アプリを再起動してください。");
      return;
    }
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
