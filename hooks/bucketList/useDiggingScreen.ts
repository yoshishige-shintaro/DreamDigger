import { BucketItem, RawBucketItem } from "@/lib/types/BucketItem";
import { Category, RawCategory } from "@/lib/types/Category";
import { TableValue } from "@/lib/utils/table";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

type UserDiggingScreen = () => {
  bucketItems: BucketItem[];
  categories: Category[];
};

export const useDiggingScreen: UserDiggingScreen = () => {
  const [bucketItems, setBucketItems] = useState<BucketItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const db = useSQLiteContext();
  useEffect(() => {
    const getAll = async () => {
      const bucketItemsRes = (await db.getAllAsync(
        "SELECT * FROM bucket_items",
      )) as RawBucketItem[];
      setBucketItems(bucketItemsRes.map((r) => new BucketItem(r)));
      const categoriesRes = (await db.getAllAsync(
        `SELECT * FROM ${TableValue.CATEGORY_TABLE}`,
      )) as RawCategory[];
      const categories = categoriesRes.map((c) => new Category(c));
      setCategories(categories);
    };
    getAll();
  }, []);

  return {
    bucketItems,
    categories,
  };
};
