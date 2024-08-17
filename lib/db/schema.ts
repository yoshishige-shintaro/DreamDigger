import { StatusValue } from "@/lib/types/BucketItem";
import { TableValue } from "@/lib/utils/table";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const bucketItemsSchema = sqliteTable(TableValue.BUCKET_ITEMS_TABLE, {
  uuid: text("uuid").notNull().primaryKey(),
  title: text("title").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  deadline: integer("deadline", { mode: "timestamp" }).notNull(),
  achievedAt: integer("achieved_at", { mode: "timestamp" }),
  status: text("status", { enum: [StatusValue.ACHIEVED, StatusValue.DURING_CHALLENGE] }).notNull(),
  categoryId: text("category_id").notNull(),
});

export const categorySchema = sqliteTable(TableValue.CATEGORY_TABLE, {
  uuid: text("uuid").notNull().primaryKey(),
  title: text("title").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
});
