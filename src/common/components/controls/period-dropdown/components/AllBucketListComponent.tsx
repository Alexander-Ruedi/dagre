import { ComboboxOptionsComponent } from "./ComboboxOptionsComponent";

export interface AllBucketListProps {
  onClick: (newId: string) => void;
  selectedBucketId: string;
}
export const AllBucketListComponent = (props: AllBucketListProps) => {
  return (
    <ComboboxOptionsComponent
      optionsLabel={"All"}
      onClick={props.onClick}
      items={[{ id: "all", label: "All buckets" }]}
      selectedBucketId={props.selectedBucketId}
    />
  );
};
