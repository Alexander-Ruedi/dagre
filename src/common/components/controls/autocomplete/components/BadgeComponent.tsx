import { classNames } from "../../../../utils/StylingUtil";
import { AutocompleteItemModel } from "../models/AutocompleteItemModel";

interface BadgeProps {
  item: AutocompleteItemModel;
  onRemove: (id: AutocompleteItemModel) => void;
  disabled: boolean;
}

export const BadgeComponent = (props: BadgeProps) => {
  return (
    <span
      className={classNames(
        "inline-flex h-8 mt-1 ml-1 pl-4 py-1 items-center rounded-full bg-gray-200 text-xs font-medium text-black",
        props.disabled ? "pr-4" : "pr-2",
      )}
    >
      {props.item.label}
      {!props.disabled && (
        <button
          type="button"
          className="ml-2 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-500 hover:text-white focus:bg-msg-red focus:text-white focus:outline-none"
          onClick={(event) => {
            event.stopPropagation();
            if (!props.disabled) {
              props.onRemove(props.item);
            }
          }}
        >
          <span className="sr-only">Remove small option</span>
          <svg className="h-3 w-3" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      )}
    </span>
  );
};
