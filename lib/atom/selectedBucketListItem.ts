import { atom } from "recoil";

export const selectedBucketListItemState = atom<
  { id: string; title: string; deadline: Date; notificationId: string | null }[]
>({
  key: "selectedBucketListItemState",
  default: [],
});
