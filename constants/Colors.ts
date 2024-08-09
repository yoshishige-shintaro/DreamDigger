// "tint" は色調を変更するために使われる用語
const tintColorLight = "#7DD3FC";
const tintColorDark = "#7DD3FC";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc", // タブアイコンの色
    tabIconSelected: tintColorLight, // タブアイコンが選択された時の色
    tabBarIndicator: tintColorLight,
  },
  dark: {
    text: "#000",
    background: "#fff",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
