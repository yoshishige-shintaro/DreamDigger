import { LIGHT_THEME_PALETTE, ThemePalette } from "@/lib/data/theme";
import { createContext } from "react";

// テーマコンテキストの型
export type ThemeContext = {
  theme: ThemePalette;
  toggleTheme: () => void;
  isDarkMode: boolean;
};

// テーマコンテキスト
// 何か不具合でコンテキストが読み取れなかった時の最後の手段として defaultValue を設定しておく
export const ThemeContext = createContext<ThemeContext>({
  theme: LIGHT_THEME_PALETTE,
  toggleTheme: () => {},
  isDarkMode: false,
});
