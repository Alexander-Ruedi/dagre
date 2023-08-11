import MultiDropdownComponent from "../../controls/dropdown/MultiDropdownComponent";
import { DropdownModel } from "../../controls/dropdown/models/DropdownModel";

export enum MergeModes {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  NONE = "NONE",
}

export const importModeOptions: DropdownModel[] = [
  { id: MergeModes.CREATE, label: "Create" },
  { id: MergeModes.UPDATE, label: "Update" },
  { id: MergeModes.DELETE, label: "Delete" },
];

export interface ImportModeSelectProps {
  selected: DropdownModel[];
  setSelected: (value: DropdownModel[]) => void;
}

export const ImportModeSelect = (props: ImportModeSelectProps) => {
  return (
    <div className="relative w-[220px]">
      <MultiDropdownComponent items={importModeOptions} onChange={props.setSelected} value={props.selected} multiple={true} hasRedStyling={false} />
    </div>
  );
};
