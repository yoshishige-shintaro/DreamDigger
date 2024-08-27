import { DB_NAME, createInitData, drizzleDb } from "@/lib/db/db";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { ErrorBoundaryProps, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import migrations from "../drizzle/migrations";

import { BASE_COLOR } from "@/constants/Colors";
import { Button, LogBox, Text, View } from "react-native";
import "react-native-reanimated";
import { RecoilRoot } from "recoil";

LogBox.ignoreLogs(["Require cycle: node_modules/victory"]);

// スプラッシュ画面が自動で閉じるのを止める
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View className="bg-white flex-1 flex-row items-center justify-center">
      <View className="w-[80%] bg-red-300 border border-red-800 rounded-lg h-auto p-4">
        <Text className="mb-2">
          エラーが発生しました。下記のボタンから再読み込みをお試しください。
        </Text>
        <Button onPress={retry} title="再読み込み" />
        <Text>{error.name}</Text>
        <Text>{error.message}</Text>
        <Text>{error.cause ? JSON.stringify(error.cause) : ""}</Text>
      </View>
    </View>
  );
}
