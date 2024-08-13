export type RawBucketItem = {
  uuid: string;
  title: string;
  created_at_iso_string: string;
  deadline_iso_string: string;
  achieved_at_iso_string: string | null;
  status: StatusValue;
  category_id: string | null;
};

export const StatusValue = {
  ACHIEVED: "achieved",
  DURING_CHALLENGE: "during_challenge",
};

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
    this.createdAt = new Date(data.created_at_iso_string);
    this.deadline = new Date(data.deadline_iso_string);
    this.achievedAt = data.achieved_at_iso_string ? new Date(data.achieved_at_iso_string) : null;
    this.status = data.status;
    this.categoryId = data.category_id;
  }
}
