import { bucketItemsSchema } from "@/lib/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// drizzle schema から型を抽出
const selectBucketItemsSchema = createSelectSchema(bucketItemsSchema);
export type RawBucketItem = z.infer<typeof selectBucketItemsSchema>;

export const StatusValue = {
  ACHIEVED: "achieved",
  DURING_CHALLENGE: "during_challenge",
} as const;

export type StatusValue = (typeof StatusValue)[keyof typeof StatusValue];

export class BucketItem {
  id: string;
  title: string;
  createdAt: Date;
  deadline: Date;
  achievedAt: Date | null;
  status: StatusValue;
  categoryId: string | null;
  constructor(data: RawBucketItem) {
    this.id = data.uuid;
    this.title = data.title;
    this.createdAt = new Date(data.createdAt);
    this.deadline = new Date(data.deadline);
    this.achievedAt = data.achievedAt ? new Date(data.achievedAt) : null;
    this.status = data.status;
    this.categoryId = data.categoryId;
  }
}
