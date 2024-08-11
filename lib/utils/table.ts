export const TableValue = {
  USER_TABLE: "user",
  BUCKET_ITEMS_TABLE: "bucket_items",
};

export type TableValue = (typeof TableValue)[keyof typeof TableValue];

