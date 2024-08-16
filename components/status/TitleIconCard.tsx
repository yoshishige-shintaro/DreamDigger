import TitleIcon from "@/components/status/icon/TitleIcon";
import { TitleName } from "@/lib/data/title";
import { Text, View } from "react-native";

type TitleIconCardProps = {
  titleName?: TitleName;
  isSquare?: boolean;
  question?: boolean;
  size: number;
};

const TitleIconCard = (props: TitleIconCardProps): JSX.Element => {
  const { titleName, isSquare = false, question = false, size } = props;

  return (
    <View
      // TODO:shadow style 共通化
      // style={{
      //   shadowColor: "#000000",
      //   shadowOpacity: 0.25,
      //   shadowRadius: 8,
      //   shadowOffset: { width: 0, height: 8 },
      // }}
      className={`bg-transparent justify-center ${isSquare ? "aspect-square w-1/2 p-1" : ""}`}
    >
      <View className="items-center">
        <TitleIcon titleName={titleName} size={size} />
        <Text className="text-3xl font-extrabold mt-2 ">{question ? "？？？？" : titleName}</Text>
      </View>
    </View>
  );
};

export default TitleIconCard;
