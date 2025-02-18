import { View } from "@/components/common/Themed";
import ProgressBar from "@/components/status/ProgressBar";
import TitleIconCard from "@/components/status/TitleIconCard";
import { useTheme } from "@/hooks/common/useTheme";
import { bucketListItemsState } from "@/lib/atom/bucketListItems";
import { TITLE_DATA_ITEMS, selectCurrentTitleData } from "@/lib/data/title";
import { StatusValue } from "@/lib/types/BucketItem";

import { ScrollView, Text } from "react-native";
import { useRecoilValue } from "recoil";

export default function StatusScreen() {
  const bucketItems = useRecoilValue(bucketListItemsState);

  const achievedCount = bucketItems.filter((b) => b.status === StatusValue.ACHIEVED).length;
  const currentTitleData = selectCurrentTitleData(achievedCount);

  const { theme } = useTheme();

  return (
    <ScrollView
      className="flex-1 px-8 max-w-[500] mx-auto"
      style={{ backgroundColor: theme.bg.primary }}
      showsVerticalScrollIndicator={false}
    >
      {/* ステータスカード */}
      <Text
        className="text-3xl font-bold text-center mt-12 mb-4"
        style={{
          shadowColor: theme.shadowColor,
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 8 },
          color: theme.text.primary,
        }}
      >
        現在の称号
      </Text>
      <View
        style={{
          shadowColor: theme.shadowColor,
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 8 },
          backgroundColor: theme.bg.secondary,
        }}
        className="status-card-container pt-16 pb-8 px-8 rounded-lg items-center justify-center flex-row"
      >
        <View className="w-full max-w-[400] bg-transparent ">
          <TitleIconCard titleName={currentTitleData.name} size={128} />
          <ProgressBar achievedCount={achievedCount} currentTitleData={currentTitleData} />
          {/* TODO:称号の説明を入れる */}
        </View>
      </View>

      {/*====================== 歴代取得称号 =============================*/}
      <Text
        className="text-3xl font-bold text-center mt-12 mb-4"
        style={{
          shadowColor: theme.shadowColor,
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 8 },
          color: theme.text.primary,
        }}
      >
        獲得した称号
      </Text>
      <View
        className="flex-row flex-wrap rounded-lg mb-12 h-[50%]"
        style={{
          shadowColor: theme.shadowColor,
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 8 },
          backgroundColor: theme.bg.secondary,
        }}
      >
        {TITLE_DATA_ITEMS.map((titleData, index) =>
          index > currentTitleData.index ? (
            <TitleIconCard key={index} isSquare question size={64} />
          ) : (
            <TitleIconCard key={index} titleName={titleData.name} isSquare size={64} />
          ),
        )}
      </View>
    </ScrollView>
  );
}
