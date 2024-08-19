import { categoriesState } from "@/lib/atom/categories";
import { RawBucketItem } from "@/lib/types/BucketItem";
import { CATEGORY_ALL_ITEM } from "@/lib/types/Category";
import { useState } from "react";
import { useRecoilValue } from "recoil";

type SelectPickerItem = {
  label: string;
  value: string;
};

type UseAchievedBucketItemsCard = (args: { achievedBucketItems: RawBucketItem[] }) => {
  selectedCategoryId: string;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
  selectPickerPlaceholder: SelectPickerItem;
  selectPickerItems: SelectPickerItem[];
  categorizedBucketItems: RawBucketItem[];
  achievedCount: number;
};

export const useAchievedBucketItemsCard: UseAchievedBucketItemsCard = (args) => {
  const { achievedBucketItems } = args;
  const [selectedCategoryId, setSelectedCategoryId] = useState(CATEGORY_ALL_ITEM.id);
  const categories = useRecoilValue(categoriesState);

  // セレクトピッカーの選択肢
  const selectPickerPlaceholder = { label: CATEGORY_ALL_ITEM.title, value: CATEGORY_ALL_ITEM.id };
  const selectPickerItems = categories.map((category) => ({
    label: category.title,
    value: category.id,
  }));

  const categorizedBucketItems =
    selectedCategoryId === CATEGORY_ALL_ITEM.id
      ? achievedBucketItems
      : achievedBucketItems.filter((item) => item.categoryId === selectedCategoryId);

  const achievedCount = categorizedBucketItems.length;
  return {
    achievedCount,
    categorizedBucketItems,
    selectedCategoryId,
    selectPickerPlaceholder,
    selectPickerItems,
    setSelectedCategoryId,
  };
};
