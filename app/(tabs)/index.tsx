import { StyleSheet, Text } from "react-native";

import { View } from "@/components/common/Themed";
import Colors from "@/constants/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function DiggingScreen() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors.light.background },
          tabBarActiveTintColor: Colors.light.text,
          tabBarIndicatorStyle: { backgroundColor: Colors.light.tabBarIndicator },
        }}
      >
        <Tab.Screen name="30秒" component={DummyScreen} />
        <Tab.Screen name="7日" component={DummyScreen} />
        <Tab.Screen name="30日" component={DummyScreen} />
      </Tab.Navigator>
    </View>
  );
}

function DummyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>きかん</Text>
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
