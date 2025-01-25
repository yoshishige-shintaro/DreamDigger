// ダークモードを実装するためのコンテキストを提供するコンポーネント
import { THEME_STORAGE_KEY } from "@/app/(tabs)/settings";
import { ThemeContext } from "@/lib/context/ThemeContext";
import { DARK_THEME_PALETTE, LIGHT_THEME_PALETTE } from "@/lib/data/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

// テーマプロバイダーコンポーネント
const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // モードの切り替え
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // デバイスの設定
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkIsThemeSettingsDark = async () => {
      // 保存されているテーマ設定
      const themeSettingsJson = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      // テーマ設定がされていない場合はデバイスの設定に合わせる
      const isThemeSettingsDark: boolean = themeSettingsJson
        ? JSON.parse(themeSettingsJson)
        : colorScheme === "dark";

      setIsDarkMode(isThemeSettingsDark);
    };
    checkIsThemeSettingsDark();
  }, []);

  // ダークモードを選択しているかどうか

  //
  const theme = isDarkMode ? DARK_THEME_PALETTE : LIGHT_THEME_PALETTE;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
