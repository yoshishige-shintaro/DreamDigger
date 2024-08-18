import Colors, { BASE_COLOR } from "@/constants/Colors";
import { bucketListItemsState } from "@/lib/atom/bucketListItems";
import { categoriesState } from "@/lib/atom/categories";
import { drizzleDb } from "@/lib/db/db";
import { bucketItemsSchema, categorySchema } from "@/lib/db/schema";
import { BucketItem } from "@/lib/types/BucketItem";
import { Category } from "@/lib/types/Category";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { asc } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Link, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { useSetRecoilState } from "recoil";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const setBucketItems = useSetRecoilState(bucketListItemsState);

  const setCategories = useSetRecoilState(categoriesState);
  const { data: bucketItemsRes } = useLiveQuery(
    drizzleDb.select().from(bucketItemsSchema).orderBy(asc(bucketItemsSchema.deadline)),
  );
  const { data: categoriesRes } = useLiveQuery(drizzleDb.select().from(categorySchema));

  // レイアウトコンポーネントが読み込まれている最中に他のコンポーネントを変更しないように useEffect を使用している
  useEffect(() => {
    setBucketItems(bucketItemsRes.map((item) => new BucketItem(item)));
  }, [bucketItemsRes]);
  useEffect(() => {
    setCategories(categoriesRes.map((item) => new Category(item)));
  }, [categoriesRes]);
  

  return (
    <Tabs
      screenOptions={{
        // TODO: colors 撲滅
        tabBarActiveTintColor: Colors.light.tint,
        headerStyle: {
          backgroundColor: BASE_COLOR,
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 18,
          fontWeight: 900,
        },
        tabBarStyle: {
          backgroundColor: Colors.light.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "発掘する",
          tabBarIcon: ({ color }) => <TabBarIcon name="pickaxe" color={color} />,
          headerRight: () => (
            <Link href="/category" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Text
                    className="text-white font-bold"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  >
                    カテゴリ管理
                  </Text>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: "ステータス",
          tabBarIcon: ({ color }) => <TabBarIcon name="account" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "発掘履歴",
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
        }}
      />
    </Tabs>
  );
}
