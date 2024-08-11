import { StyleSheet, Text } from "react-native";

import BucketList from "@/components/bucketList/BucketList";
import { View } from "@/components/common/Themed";
import Colors from "@/constants/Colors";
import { useDiggingScreen } from "@/hooks/bucketList/useDiggingScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function DiggingScreen() {
  const Tab = createMaterialTopTabNavigator();

  const { bucketItems, categories } = useDiggingScreen();
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors.light.background },
          tabBarActiveTintColor: Colors.light.text,
          tabBarIndicatorStyle: { backgroundColor: Colors.light.tabBarIndicator },
        }}
      >
        {categories.map((category) => (
          <Tab.Screen name={category} key={category}>
            {() => <BucketList bucketItems={bucketItems} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </View>
  );
}

function DummyScreen() {
  const now = new Date();
  const s = now.toISOString();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>きかん</Text>
      <Text>{now.toString()}</Text>
      <Text>{s}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
});
