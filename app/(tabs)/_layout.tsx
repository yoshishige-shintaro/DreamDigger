import Walkthrough from "@/components/walkthrough/Walkthrough";
import Colors, { BASE_COLOR } from "@/constants/Colors";
import { bucketListItemsState } from "@/lib/atom/bucketListItems";
import { categoriesState } from "@/lib/atom/categories";
import { drizzleDb } from "@/lib/db/db";
import { bucketItemsSchema, categorySchema } from "@/lib/db/schema";
import { BucketItem } from "@/lib/types/BucketItem";
import { Category } from "@/lib/types/Category";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { asc } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Link, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { useSetRecoilState } from "recoil";

SplashScreen.preventAutoHideAsync(); // スプラッシュスクリーンを自動的に隠さないようにする

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // TODO:フックにロジックを切り出す
  const setBucketItems = useSetRecoilState(bucketListItemsState);

  const setCategories = useSetRecoilState(categoriesState);
  const { data: bucketItemsRes } = useLiveQuery(
    drizzleDb.select().from(bucketItemsSchema).orderBy(asc(bucketItemsSchema.deadline)),
  );
  const { data: categoriesRes } = useLiveQuery(drizzleDb.select().from(categorySchema));

  const [isOpenWalkthrough, setIsOpenWalkthrough] = useState<boolean | null>(null);

  // レイアウトコンポーネントが読み込まれている最中に他のコンポーネントを変更しないように useEffect を使用している
  useEffect(() => {
    setBucketItems(bucketItemsRes.map((item) => new BucketItem(item)));
  }, [bucketItemsRes]);
  useEffect(() => {
    setCategories(categoriesRes.map((item) => new Category(item)));
  }, [categoriesRes]);

  useEffect(() => {
    const checkFirstVisit = async () => {
      try {
        const isFirstVisitString = await AsyncStorage.getItem("isFirstVisit");
        const isFirstVisit = isFirstVisitString
          ? (JSON.parse(isFirstVisitString) as boolean)
          : true;
        if (isFirstVisit) {
          setIsOpenWalkthrough(true);
        } else {
          setIsOpenWalkthrough(false);
        }
      } catch (error) {
        console.error("Error retrieving data from asyncStorage:", error);
        throw error;
      } finally {
        await SplashScreen.hideAsync(); // データの取得が完了したらスプラッシュスクリーンを隠す
      }
    };

    checkFirstVisit();
  }, []);

  if (isOpenWalkthrough === null) {
    return null;
  }

  return (
    <>
      {isOpenWalkthrough && <Walkthrough setIsOpenWalkthrough={setIsOpenWalkthrough} />}
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
              headerLeft: () => (
                <Link href="/usage" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Text
                        className="text-white font-bold"
                        style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                      >
                        使い方
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
    </>
  );
}
