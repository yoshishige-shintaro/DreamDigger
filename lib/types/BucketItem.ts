export type RawBucketItem = {
  uuid: string;
  title: string;
  created_at_iso_string: string;
  deadline_iso_string: string;
  status: StatusValue;
  category: string | null;
};

export const StatusValue = {
  ACHIEVED: "achieved",
  DURING_CHALLENGE: "during_challenge",
  EXPIRED: "expired",
};

export type StatusValue = (typeof StatusValue)[keyof typeof StatusValue];

export class BucketItem {
  id: string;
  title: string;
  createdAt: Date;
  deadline: Date;
  status: StatusValue;
  category: string | null;
  constructor(data: RawBucketItem) {
    this.id = data.uuid;
    this.title = data.title;
    this.createdAt = new Date(data.created_at_iso_string);
    this.deadline = new Date(data.deadline_iso_string);
    this.status = data.status;
    this.category = data.category;
  }
}
