// 必要なもの
// 入力：現在の達成数
// 出力：条件を満たしている称号の中で必要数が一番大きい称号の titleId

export const TitleName = {
  NEWCOMER: "新人",
  BEGINNER: "かけだし",
  INEXPERIENCED: "半人前",
  MACHO: "マッチョ",
  PICKAXE: "ピッケル",
  EXCAVATOR: "発掘マシン",
  EXCAVATION_KING: "発掘王",
  DREAM_DIGGER: "D.D.",
} as const;

export type TitleName = (typeof TitleName)[keyof typeof TitleName];

export type TitleDataItem = {
  index: number;
  name: TitleName;
  requiredAchieveCount: number;
};

const REQUIRED_ACHIEVE_COUNTS = [0, 4, 10, 18, 28, 48, 68, 98];

export const TITLE_DATA_ITEMS: TitleDataItem[] = Object.values(TitleName).reduce<TitleDataItem[]>(
  (acc, titleName, index) => {
    acc.push({
      index: index,
      name: titleName,
      requiredAchieveCount: REQUIRED_ACHIEVE_COUNTS[index],
    });
    return acc;
  },
  [],
);

export const selectCurrentTitleData = (achievedCount: number): TitleDataItem => {
  let currentTitleData: TitleDataItem = TITLE_DATA_ITEMS[0];

  TITLE_DATA_ITEMS.forEach((dataItem) => {
    if (dataItem.requiredAchieveCount <= achievedCount) {
      currentTitleData = dataItem;
    }
  });
  return currentTitleData;
};
