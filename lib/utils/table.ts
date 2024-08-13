export const TableValue = {
  USER_TABLE: "user",
  BUCKET_ITEMS_TABLE: "bucket_items",
  CATEGORY_TABLE: "category",
};

export type TableValue = (typeof TableValue)[keyof typeof TableValue];
