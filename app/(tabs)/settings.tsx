import { useTheme } from "@/hooks/common/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking, Pressable, Switch, Text, View } from "react-native";

export const THEME_STORAGE_KEY = "app_theme_mode";

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const onChangeMode = async () => {
    // モードの永続化
    await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(!isDarkMode));
    // モード切り替え
    toggleTheme();
  };

  const redirectReviewPage = () => {
    Linking.openURL(
      `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${6670152666}?action=write-review`,
    );
  };

  return (
    <View className="flex-1 px-4" style={{ backgroundColor: theme.bg.primary }}>
      {/* ダークモード */}
      <View
        className="mt-8 rounded-lg h-16 justify-center px-4"
        style={{ backgroundColor: theme.bg.secondary }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-sm" style={{ color: theme.text.primary }}>
            ダークモード
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={onChangeMode}
            trackColor={{ true: theme.accent.primary, false: "#f4f3f4" }}
          />
        </View>
      </View>
      {/* レビュー */}
      <Pressable onPress={redirectReviewPage}>
        <View
          className="mt-1 rounded-lg h-16 justify-center px-4"
          style={{ backgroundColor: theme.bg.secondary }}
        >
          <Text className="text-sm" style={{ color: theme.text.primary }}>
            レビューを書く
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;
