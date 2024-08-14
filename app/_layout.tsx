import { BASE_COLOR } from "@/constants/Colors";
import { DB_NAME, migrateDbIfNeeded } from "@/lib/utils/db";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

import "react-native-reanimated";
import { RecoilRoot } from "recoil";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SQLiteProvider databaseName={DB_NAME} onInit={migrateDbIfNeeded}>
      <RecoilRoot>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="category"
            options={{
              presentation: "card",
              headerTitle: "カテゴリ管理",
              headerLeft: () => (
                <Link href="/(tabs)/" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <View className="flex-row" style={{ opacity: pressed ? 0.5 : 1 }}>
                        <AntDesign name="left" size={24} color="white" />
                        <Text className="text-white font-bold text-base">戻る</Text>
                      </View>
                    )}
                  </Pressable>
                </Link>
              ),
              headerStyle: { backgroundColor: BASE_COLOR },
              headerTitleStyle: {
                color: "#fff",
              },
            }}
          />
        </Stack>
      </RecoilRoot>
    </SQLiteProvider>
  );
}
