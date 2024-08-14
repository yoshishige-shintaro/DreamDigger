import Colors, { BASE_COLOR } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Pressable, Text, useColorScheme } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerStyle: {
          backgroundColor: BASE_COLOR,
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 18,
          fontWeight: 900,
        },
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
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
        name="two"
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
