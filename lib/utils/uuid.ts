import uuid from "react-native-uuid";

export const createUuid = (): string => {
  // v4()に引数を渡さない限り string で uuid が返却される。
  // ライブラリ作成者の謎の気遣いで返り値が string | number[] になっているので string にダウンキャスト
  return uuid.v4() as string;
};
