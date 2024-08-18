import { categorySchema } from "@/lib/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// drizzle schema から型を抽出
const selectCategorySchema = createSelectSchema(categorySchema);
export type RawCategory = z.infer<typeof selectCategorySchema>;

export class Category {
  id: string;
  title: string;
  isActive: boolean;
  constructor(data: RawCategory) {
    this.id = data.uuid;
    this.title = data.title;
    this.isActive = data.isActive;
  }
}

export const CATEGORY_ALL_ITEM: Category = {
  id: "all-items",
  title: "すべて",
  isActive: true,
};
