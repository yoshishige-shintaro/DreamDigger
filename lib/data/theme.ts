// ライトテーマ
export const LIGHT_THEME_PALETTE = {
  bg: {
    primary: "#f2f2f2",
    // タブ、やりたいことリスト等の背景色
    secondary: "#FFFFFF",
  },
  text: {
    primary: "#000000",
    secondary: "#cccccc",
  },
  accent: {
    // ヘッダー等の色
    primary: "#bae6fd",
  },
};

// ダークテーマ
export const DARK_THEME_PALETTE = {
  bg: {
    primary: "#000000",
    secondary: "#1C1C1E",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#8E8E93",
  },
  accent: {
    primary: "#0071b3",
  },
};

// テーマの型
export type ThemePalette = typeof LIGHT_THEME_PALETTE;
