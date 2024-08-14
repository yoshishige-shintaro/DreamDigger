import AddBucketListItemModal from "@/components/bucketList/AddBucketListItemModal";
import BucketList from "@/components/bucketList/BucketList";
import EditBucketListItemModal from "@/components/bucketList/EditBucketListItemModal";
import Colors from "@/constants/Colors";
import { useDiggingScreen } from "@/hooks/bucketList/useDiggingScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function DiggingScreen() {
  const Tab = createMaterialTopTabNavigator();

  const { bucketItems, categories } = useDiggingScreen();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors.light.background },
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
        {[{ id: "all-items", title: "全て" }, ...categories].map((category, index) => (
          <Tab.Screen name={category.title} key={category.id}>
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
      <AddBucketListItemModal categories={categories} />

      <EditBucketListItemModal />
    </>
  );
}
