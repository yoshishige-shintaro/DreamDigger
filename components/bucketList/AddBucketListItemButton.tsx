import CircleIconButton from "@/components/bucketList/parts/CircleIconButton";

const AddBucketListItemButton = (props: { openModal: () => void }): JSX.Element => {
  return <CircleIconButton icon="check" onPress={props.openModal} />;
};

export default AddBucketListItemButton;
