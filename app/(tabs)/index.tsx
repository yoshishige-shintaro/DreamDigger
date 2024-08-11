import BucketList from "@/components/bucketList/BucketList";
import Colors from "@/constants/Colors";
import { useDiggingScreen } from "@/hooks/bucketList/useDiggingScreen";
import { BucketItem, StatusValue } from "@/lib/types/BucketItem";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const DUMMY_BUCKET_ITEMS: BucketItem[] = [
  {
    id: "1",
    category: "仕事",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "技術書を読む",
  },
  {
    id: "2",
    category: "プライベート",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 23 * 60 * 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "北海道に行く",
  },
  {
    id: "3",
    category: "仕事",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 30 * 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "ビジネス書を読む",
  },
  {
    id: "4",
    category: "プライベート",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 30 * 60 * 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "沖縄に行く",
  },
  {
    id: "5",
    category: "仕事",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "技術書を読む",
  },
  {
    id: "6",
    category: "プライベート",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 23 * 60 * 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "北海道に行く",
  },
  {
    id: "7",
    category: "仕事",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 30 * 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "ビジネス書を読む",
  },
  {
    id: "8",
    category: "プライベート",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 30 * 60 * 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "沖縄に行く",
  },
  {
    id: "9",
    category: "仕事",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "技術書を読む",
  },
  {
    id: "10",
    category: "プライベート",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 23 * 60 * 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "北海道に行く",
  },
  {
    id: "11",
    category: "仕事",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 30 * 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "ビジネス書を読む",
  },
  {
    id: "12",
    category: "プライベート",
    createdAt: new Date(),
    deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 30 * 60 * 60 * 1000),
    status: StatusValue.DURING_CHALLENGE,
    title: "沖縄に行く",
  },
];

export default function DiggingScreen() {
  const Tab = createMaterialTopTabNavigator();

  const { bucketItems, categories } = useDiggingScreen();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.light.background },
        tabBarActiveTintColor: Colors.light.text,
        tabBarIndicatorStyle: { backgroundColor: Colors.light.tabBarIndicator },
      }}
    >
      {categories.map((category, index) => (
        <Tab.Screen name={category} key={category}>
          {() => (
            <BucketList
              bucketItems={
                index === 0
                  ? DUMMY_BUCKET_ITEMS
                  : DUMMY_BUCKET_ITEMS.filter((item) => item.category === category)
              }
            />
          )}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}
