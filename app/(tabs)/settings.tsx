import { useTheme } from "@/hooks/common/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch, Text, View } from "react-native";

export const THEME_STORAGE_KEY = "app_theme_mode";

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const onChangeMode = async () => {
    // モードの永続化
    await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(!isDarkMode));
    // モード切り替え
    toggleTheme();
  };

  return (
    <View className="flex-1 px-4" style={{ backgroundColor: theme.bg.primary }}>
      <View className="mt-8 rounded-lg p-4" style={{ backgroundColor: theme.bg.secondary }}>
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
    </View>
  );
};

export default SettingsScreen;
