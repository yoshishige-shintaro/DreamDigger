import { BucketItem } from "@/lib/types/BucketItem";
import { atom } from "recoil";

export const bucketListItemsState = atom<BucketItem[]>({
  key: "bucketListItemsState",
  default: [],
});
