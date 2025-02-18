import { DB_NAME, createInitData, drizzleDb } from "@/lib/db/db";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { ErrorBoundaryProps, Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import migrations from "../drizzle/migrations";

import ThemeProvider from "@/components/common/ThemePovider";
import { useTheme } from "@/hooks/common/useTheme";
import { setNotificationHandler } from "expo-notifications";
import { Button, LogBox, Pressable, Text, View } from "react-native";
import "react-native-reanimated";
import { RecoilRoot } from "recoil";

LogBox.ignoreLogs(["Require cycle: node_modules/victory"]);

// ユーザーへの表示設定
// この設定によってユーザーに通知が表示されるようになる
setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // 通知の表示設定
    shouldPlaySound: true, // 通知のサウンド設定
    shouldSetBadge: false, // 通知のバッジ設定
  }),
});

// スプラッシュ画面が自動で閉じるのを止める
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Sqlite マイグレーション
  const { success: _, error } = useMigrations(drizzleDb, migrations);

  if (error) {
    throw error;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const { theme } = useTheme();

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
            headerStyle: { backgroundColor: theme.accent.primary },
            headerTitleStyle: {
              color: theme.text.header,
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="category" />
          <Stack.Screen
            name="usage"
            options={{
              gestureDirection: "vertical",
              headerTitle: "使い方",
              headerLeft: () => <View />,
              headerRight: () => <CloseButton />,
            }}
          />
        </Stack>
      </RecoilRoot>
    </SQLiteProvider>
  );
}

// 閉じるボタン
const CloseButton = (): JSX.Element => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
    >
      {({ pressed }) => (
        <View className="flex-row" style={{ opacity: pressed ? 0.5 : 1 }}>
          <Text className={`font-bold text-base`} style={{ color: theme.text.header }}>
            閉じる
          </Text>
        </View>
      )}
    </Pressable>
  );
};

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
