import { ThemeContext } from "@/lib/context/ThemeContext";
import { useContext } from "react";

// Provider 配下のコンポーネントで使用する
// テーマコンテキストを取得できるようにするカスタムフック
export const useTheme = (): ThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
