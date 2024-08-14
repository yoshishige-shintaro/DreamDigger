// "tint" は色調を変更するために使われる用語
export const TINT_COLOR = "#7DD3FC";
const tintColorDark = "#7DD3FC";
// bg-sky-200 bae6fd
export const BASE_COLOR = "#bae6fd";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: TINT_COLOR,
    tabIconDefault: "#ccc", // タブアイコンの色
    tabIconSelected: TINT_COLOR, // タブアイコンが選択された時の色
    tabBarIndicator: TINT_COLOR,
  },
  dark: {
    text: "#000",
    background: "#fff",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
