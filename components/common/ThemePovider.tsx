// ダークモードを実装するためのコンテキストを提供するコンポーネント
import { ThemeContext } from "@/lib/context/ThemeContext";
import { DARK_THEME_PALETTE, LIGHT_THEME_PALETTE } from "@/lib/data/theme";
import { useState } from "react";

// テーマプロバイダーコンポーネント
const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  // ダークモードを選択しているかどうか
  const [isDarkMode, setIsDarkMode] = useState(false);

  // モードの切り替え
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  //
  const theme = isDarkMode ? DARK_THEME_PALETTE : LIGHT_THEME_PALETTE;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
