import { TINT_COLOR } from "@/constants/Colors";
import { checkNotificationPermissions } from "@/lib/utils/notification";
import * as Linking from "expo-linking";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { Alert, Switch } from "react-native";

type RhfToggleSwitchProps<T extends FieldValues> = UseControllerProps<T>;

const RhfToggleSwitch = <T extends FieldValues>(props: RhfToggleSwitchProps<T>): JSX.Element => {
  const { name, control } = props;
  const {
    field: { onChange, value },
  } = useController({ control, name });

  // トグルボタンが押された時の処理
  const onChangeToggle = async (value: boolean) => {
    // とりあえず値を変化させる
    onChange(value);

    // "isRemind" が true になった時、通知許可があるかを調べて、なければ設定に誘導
    if (value) {
      const isNotificationPermitted = await checkNotificationPermissions();
      // 通知許可が得られていない場合
      if (!isNotificationPermitted) {
        // 設定アプリを開く
        openSettingsApp();
        // "isRemind" を false にしておく
        onChange(false);
      }
    }
  };

  return (
    <Switch
      value={value}
      onValueChange={async (value) => {
        await onChangeToggle(value);
      }}
      trackColor={{ true: TINT_COLOR, false: "#f4f3f4" }}
    />
  );
};

//設定アプリを開く関数
const openSettingsApp = () => {
  // 設定アプリへの誘導
  Alert.alert(
    "通知の許可が必要です",
    "リマインド機能を使用するには、通知の許可が必要です。\n設定を開いて通知を許可してください。",
    [
      { text: "設定を開く", onPress: () => Linking.openSettings() },
      { text: "キャンセル", style: "cancel" },
    ],
    { cancelable: false },
  );
};

export default RhfToggleSwitch;
