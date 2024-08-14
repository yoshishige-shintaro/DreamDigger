import { bucketListItemsState } from "@/lib/atom/bucketListItems";
import { BucketItem, RawBucketItem, StatusValue } from "@/lib/types/BucketItem";
import { Category, RawCategory } from "@/lib/types/Category";
import { TableValue } from "@/lib/utils/table";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type UserDiggingScreen = () => {
  bucketItems: BucketItem[];
  categories: Category[];
};

export const useDiggingScreen: UserDiggingScreen = () => {
  const [bucketItems, setBucketItems] = useRecoilState(bucketListItemsState);
  const [categories, setCategories] = useState<Category[]>([]);
  const db = useSQLiteContext();
  useEffect(() => {
    const getAll = async () => {
      // TODO:一覧取得処理の共通化
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
    bucketItems: bucketItems.filter((item) => item.status !== StatusValue.ACHIEVED),
    categories,
  };
};
