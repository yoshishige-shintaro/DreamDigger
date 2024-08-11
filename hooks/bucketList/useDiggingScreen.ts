import { BucketItem, RawBucketItem } from "@/lib/types/BucketItem";
import { RawUser, User } from "@/lib/types/User";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

type UserDiggingScreen = () => {
  bucketItems: BucketItem[];
  categories: string[];
};

export const useDiggingScreen: UserDiggingScreen = () => {
  const [bucketItems, setBucketItems] = useState<BucketItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["全て"]);
  const db = useSQLiteContext();
  useEffect(() => {
    const getAll = async () => {
      const bucketItemsRes = (await db.getAllAsync(
        "SELECT * FROM bucket_items",
      )) as RawBucketItem[];
      setBucketItems(bucketItemsRes.map((r) => new BucketItem(r)));
      const userRes = (await db.getFirstAsync("SELECT categories FROM user")) as RawUser;
      const user = new User(userRes);
      setCategories(["全て", ...user.categories] ?? ["全て"]);
    };
    getAll();
  }, []);

  return {
    bucketItems,
    categories,
  };
};
