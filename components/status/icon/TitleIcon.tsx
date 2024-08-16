import BeginnerIcon from "@/components/status/icon/BeginnerIcon";
import DreamDiggerIcon from "@/components/status/icon/DreamDiggerIcon";
import ExcavationKingIcon from "@/components/status/icon/ExcavationKingIcon";
import ExcavatorIcon from "@/components/status/icon/ExcavatorIcon";
import InexperiencedIcon from "@/components/status/icon/InexperiencedIcon";
import MachoIcon from "@/components/status/icon/MachoIcon";
import NewcomerIcon from "@/components/status/icon/Newcomer";
import PickaxeIcon from "@/components/status/icon/PickaxeIcon";
import { QuestionIcon } from "@/components/status/icon/QuestionIcon";
import { TitleName } from "@/lib/data/title";

type TitleIconProps = {
  titleName?: TitleName;
  size: number;
};

const TitleIcon = (props: TitleIconProps) => {
  const { titleName, size } = props;
  switch (titleName) {
    case TitleName.NEWCOMER:
      return <NewcomerIcon size={size} />;
    case TitleName.BEGINNER:
      return <BeginnerIcon size={size} />;
    case TitleName.INEXPERIENCED:
      return <InexperiencedIcon size={size} />;
    case TitleName.MACHO:
      return <MachoIcon size={size} />;
    case TitleName.PICKAXE:
      return <PickaxeIcon size={size} />;
    case TitleName.EXCAVATOR:
      return <ExcavatorIcon size={size} />;
    case TitleName.EXCAVATION_KING:
      return <ExcavationKingIcon size={size} />;
    case TitleName.DREAM_DIGGER:
      return <DreamDiggerIcon size={size} />;
    default:
      return <QuestionIcon />;
  }
};

export default TitleIcon;
