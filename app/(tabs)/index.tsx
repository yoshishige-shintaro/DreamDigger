import AddBucketListItemButton from "@/components/bucketList/AddBucketListItemButton";
import AddBucketListItemModal from "@/components/bucketList/AddBucketListItemModal";
import BucketList from "@/components/bucketList/BucketList";
import Colors from "@/constants/Colors";
import { useDiggingScreen } from "@/hooks/bucketList/useDiggingScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";

// const DUMMY_BUCKET_ITEMS: BucketItem[] = [
//   {
//     id: "1",
//     category: "仕事",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "技術書を読む",
//   },
//   {
//     id: "2",
//     category: "プライベート",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 23 * 60 * 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "北海道に行く",
//   },
//   {
//     id: "3",
//     category: "仕事",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 30 * 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "ビジネス書を読む",
//   },
//   {
//     id: "4",
//     category: "プライベート",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 30 * 60 * 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "沖縄に行く",
//   },
//   {
//     id: "5",
//     category: "仕事",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "技術書を読む",
//   },
//   {
//     id: "6",
//     category: "プライベート",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 23 * 60 * 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "北海道に行く",
//   },
//   {
//     id: "7",
//     category: "仕事",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 30 * 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "ビジネス書を読む",
//   },
//   {
//     id: "8",
//     category: "プライベート",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 30 * 60 * 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "沖縄に行く",
//   },
//   {
//     id: "9",
//     category: "仕事",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "技術書を読む",
//   },
//   {
//     id: "10",
//     category: "プライベート",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 23 * 60 * 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "北海道に行く",
//   },
//   {
//     id: "11",
//     category: "仕事",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 30 * 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "ビジネス書を読む",
//   },
//   {
//     id: "12",
//     category: "プライベート",
//     createdAt: new Date(),
//     deadline: new Date(new Date().getTime() + 30 * 60 * 1000 + 30 * 60 * 60 * 1000),
//     status: StatusValue.DURING_CHALLENGE,
//     title: "沖縄に行く",
//   },
// ];

export default function DiggingScreen() {
  const Tab = createMaterialTopTabNavigator();

  const { bucketItems, categories } = useDiggingScreen();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const deviceHeight = Dimensions.get("window").height;
  const slideAnim = useRef(new Animated.Value(deviceHeight)).current; // 初期位置を設定

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: deviceHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsOpenModal(false));
  };
  const openModal = () => {
    setIsOpenModal(true);
    // モーダルを表示するアニメーション
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors.light.background },
          tabBarActiveTintColor: Colors.light.text,
          tabBarIndicatorStyle: { backgroundColor: Colors.light.tabBarIndicator },
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
      <AddBucketListItemButton openModal={openModal} />
      {isOpenModal && (
        <AddBucketListItemModal
          isOpen={isOpenModal}
          slideAnim={slideAnim}
          closeModal={closeModal}
          categories={categories}
        />
      )}
    </>
  );
}
