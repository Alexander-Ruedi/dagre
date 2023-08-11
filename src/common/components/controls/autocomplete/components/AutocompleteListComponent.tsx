import { classNames } from "../../../../utils/StylingUtil";
import { AutocompleteItemModel } from "../models/AutocompleteItemModel";

interface AutocompleteListProps {
  items: Array<AutocompleteItemModel>;
  searchTerm: string;
  onAdd: (item: AutocompleteItemModel) => void;
  isOpen: boolean;
  actionItem?: string;
  onActionItem?: () => void;
}

export const AutocompleteListComponent = (props: AutocompleteListProps) => {
  const displayedItems = props.items.filter((item) => item.label.indexOf(props.searchTerm) !== -1);
  const isListVisible = displayedItems.length > 0;

  if (!props.isOpen || !isListVisible) return <></>;

  return (
    <div className="w-full border-gray-300 shadow-sm border rounded-md">
      {props.actionItem && (
        <div
          className="block pl-4 py-1 text-black cursor-pointer hover:bg-gray-100"
          onClick={() => {
            if (props.onActionItem) {
              props.onActionItem();
            }
          }}
        >
          {props.actionItem}
        </div>
      )}
      {props.items &&
        props.items.map((item) => {
          if (item.label.indexOf(props.searchTerm) !== -1) {
            return (
              <div
                className={classNames("block pl-4 py-1", !item.active ? "text-black cursor-pointer hover:bg-gray-100" : "text-gray-300")}
                key={item.id}
                onClick={() => {
                  return props.onAdd(item);
                }}
              >
                {item.label}
              </div>
            );
          }
        })}
    </div>
  );
};
