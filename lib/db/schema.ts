import { TableValue } from "@/lib/utils/table";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const bucketItemsSchema = sqliteTable(TableValue.BUCKET_ITEMS_TABLE, {
  uuid: text("uuid").notNull().primaryKey(),
  title: text("title").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  deadline: integer("deadline", { mode: "timestamp" }).notNull(),
  achievedAt: integer("achieved_at", { mode: "timestamp" }),
  // TODO: なぜかStatusValue.ACHIEVED , StatusValue.DURING_CHALLENGE が読み込めない
  status: text("status", { enum: ["achieved", "during_challenge"] }).notNull(),
  categoryId: text("category_id"),
  // プッシュ通知に紐づく Id、通知を削除するときに使用する
  notificationId: text("notification_id"),
});

export const categorySchema = sqliteTable(TableValue.CATEGORY_TABLE, {
  uuid: text("uuid").notNull().primaryKey(),
  title: text("title").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true).notNull(),
});
