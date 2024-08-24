import { DB_NAME, createInitData, drizzleDb, expoDb } from "@/lib/db/db";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useFonts } from "expo-font";
import { ErrorBoundaryProps, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import migrations from "../drizzle/migrations";

import { BASE_COLOR } from "@/constants/Colors";
import { LogBox, Text, View } from "react-native";
import "react-native-reanimated";
import { RecoilRoot } from "recoil";

LogBox.ignoreLogs(["Require cycle: node_modules/victory"]);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useDrizzleStudio(expoDb);
  // Sqlite マイグレーション
  const { success: _, error } = useMigrations(drizzleDb, migrations);

  if (error) {
    throw error;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
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

  // TOdO:スプラッシュページが表示される仕組みを調べる
  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName={DB_NAME} onInit={createInitData}>
      <RecoilRoot>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: BASE_COLOR },
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="category" />
        </Stack>

      </RecoilRoot>
    </SQLiteProvider>
  );
}

// TODO:エラー時の表示をちゃんとする
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>再読み込み</Text>
    </View>
  );
}
