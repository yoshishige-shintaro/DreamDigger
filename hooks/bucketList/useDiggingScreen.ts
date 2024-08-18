import { bucketListItemsState } from "@/lib/atom/bucketListItems";
import { categoriesState } from "@/lib/atom/categories";
import { BucketItem, StatusValue } from "@/lib/types/BucketItem";
import { Category } from "@/lib/types/Category";
import { useRecoilValue } from "recoil";

type UserDiggingScreen = () => {
  bucketItems: BucketItem[];
  categories: Category[];
};

export const useDiggingScreen: UserDiggingScreen = () => {
  const bucketItems = useRecoilValue(bucketListItemsState);
  const categories = useRecoilValue(categoriesState);

  return {
    bucketItems: bucketItems.filter((item) => item.status !== StatusValue.ACHIEVED),
    categories: categories.filter((item) => item.isActive),
  };
};
