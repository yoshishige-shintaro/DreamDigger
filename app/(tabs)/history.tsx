import { StyleSheet } from "react-native";

import { Text, View } from "@/components/common/Themed";

export default function TabTwoScreen() {
  return (
    <View className="flex-1 justify-center items-center -rotate-45 ">
      <Text className="font-bold text-3xl">飲み物</Text>
      <Text className="font-bold text-3xl">お菓子</Text>
      <Text className="font-bold text-3xl">ティッシュ</Text>
      <Text className="font-bold text-3xl">買ってくる</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
