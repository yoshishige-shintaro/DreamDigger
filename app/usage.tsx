import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const UsageScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        {[
          {
            title: "1. とにかく実行する",
            content: [
              "思いついたことはすぐにアプリに記録しましょう。",
              "小さなことでも構いません。まずは行動することが大切です。",
              "実行後は、チェックボックスにチェックを入れて達成感を味わいましょう。",
            ],
          },
          {
            title: "2. 行動を細分化して書き出す",
            content: [
              "小さな行動に分けて記録しましょう。",
              "例：「本を読む」→「本を手に取る」「表紙を見る」「1ページ目を開く」「1行目を読む」など",
              "細分化することで、実行のハードルが下がり、達成しやすくなります。",
            ],
          },
          {
            title: "3. 習慣となっているものも書き出す",
            content: [
              "日常的に行っていることも書き出してみましょう。",
              "例：「朝のコーヒーを飲む」「ご飯を食べる」「歯を磨く」など",
              "普段当たり前にしていることもあえてやりたいこととしてみましょう。",
            ],
          },
          {
            title: "4. だらけたいということも書き出す",
            content: [
              "だらけることにも意識的になりましょう。",
              "例：「昼寝をする」「ゲームをする」「ベッドから出ない」など",
              "生産的な行動でなくてもそれがやりたいことなのであればいくらでもやってやりましょう。",
            ],
          },
        ].map((section, index) => (
          <View key={index} className="mb-6 bg-white rounded-lg shadow-md ">
            <View className={`bg-sky-200 p-4`}>
              <Text className="text-xl font-bold text-white">{section.title}</Text>
            </View>
            <View className="p-4">
              {section.content.map((item, i) => (
                <Text key={i} className="text-gray-700 text-base mb-2">
                  • {item}
                </Text>
              ))}
            </View>
          </View>
        ))}

        <View className="bg-sky-200 p-4 rounded-lg mt-4 mb-12 shadow-md">
          <Text className="text-indigo-800 text-base">
            このアプリを通じて、様々な行動を意識的に選択し実行することで、あなたの中に眠っている「やりたいこと」を見つけ出しましょう。日々の小さな行動が、新しい興味や情熱につながります。
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UsageScreen;
