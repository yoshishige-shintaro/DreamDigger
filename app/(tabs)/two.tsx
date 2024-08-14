import { StyleSheet } from "react-native";

import { Text, View } from "@/components/common/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text className="text-9xl font-extrabold rotate-45">ご飯休憩</Text>
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
    fontSize: 40,
    fontWeight: "bold",
    height: 40,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
