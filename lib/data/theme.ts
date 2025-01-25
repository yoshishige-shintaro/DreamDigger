// ライトテーマ
export const LIGHT_THEME_PALETTE = {
  bg: {
    primary: "#f2f2f2",
    // タブ、やりたいことリスト等の背景色
    secondary: "#FFFFFF",
  },
  text: {
    header: "#FFFFFF",
    primary: "#000000",
    secondary: "#cccccc",
  },
  accent: {
    // ヘッダー等の色
    primary: "#bae6fd",
  },
  shadowColor: "#000000",
};

// ダークテーマ
export const DARK_THEME_PALETTE = {
  bg: {
    primary: "#1C1C1E",
    secondary: "#000000",
  },
  text: {
    header: "#FFFFFF",
    primary: "#CCCCCC",
    secondary: "#8E8E93",
  },
  accent: {
    primary: "#0071b3",
  },
  shadowColor: "#FFFFFF",
};

// テーマの型
export type ThemePalette = typeof LIGHT_THEME_PALETTE;
