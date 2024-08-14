import AddBucketListItemModal from "@/components/bucketList/AddBucketListItemModal";
import BucketList from "@/components/bucketList/BucketList";
import EditBucketListItemModal from "@/components/bucketList/EditBucketListItemModal";
import Colors from "@/constants/Colors";
import { useDiggingScreen } from "@/hooks/bucketList/useDiggingScreen";
import { CATEGORY_ALL_ITEM } from "@/lib/types/Category";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState } from "react";

export default function DiggingScreen() {
  const Tab = createMaterialTopTabNavigator();

  const { bucketItems, categories } = useDiggingScreen();

  // やりたいこと追加モーダルの「カテゴリ」デフォルト値を更新するためのステート
  const [currentCategoryId, setCurrentCategoryId] = useState(CATEGORY_ALL_ITEM.id);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.light.background,
            shadowColor: "#000000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 4 },
          },
          tabBarItemStyle: { width: "auto" },
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarActiveTintColor: Colors.light.text,
          tabBarIndicatorStyle: { backgroundColor: Colors.light.tabBarIndicator },
          tabBarScrollEnabled: true,
        }}
        // SCREEN の wrapper のスタイル
        sceneContainerStyle={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {[CATEGORY_ALL_ITEM, ...categories].map((category, index) => (
          <Tab.Screen
            name={category.title}
            key={category.id}
            listeners={{
              focus: () => {
                setCurrentCategoryId(category.id);
              },
            }}
          >
            {() => (
              <BucketList
                bucketItems={
                  index === 0
                    ? bucketItems
                    : bucketItems.filter((item) => item.categoryId === category.id)
                }
              />
            )}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
      {/* やりたいこと追加ボタン & モーダル */}
      <AddBucketListItemModal currentCategoryId={currentCategoryId} categories={categories} />
      {/* やりたいこと削除・編集ボタン & モーダル */}
      <EditBucketListItemModal />
    </>
  );
}
