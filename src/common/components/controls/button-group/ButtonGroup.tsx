import { classNames } from "../../../utils/StylingUtil";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";

interface ButtonItem {
  id: string;
  label: string;
  disabled?: boolean;
}
interface ButtonGroupProps {
  items: Array<ButtonItem>;
  onChange: (id: string) => void;
  value: string;
  disabled?: boolean;
  disabledText?: string;
}

const defaultCSS =
  "relative border px-4 py-2 text-sm font-normal focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-default";
const firstItemCSS = "rounded-l-md";
const notFirstItemCSS = "-ml-px";
const lastItemCSS = "rounded-r-md";
const selectedItemCSS = "border-msg-red bg-msg-red text-white";
const notSelectedItemCSS =
  "border-gray-300 bg-white text-gray-700  hover:bg-gray-50 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500";
export const ButtonGroupComponent = (props: ButtonGroupProps) => {
  const widthWorkaround = `calc(100% / ${props.items.length})`;

  return (
    <span className="flex w-full rounded-md shadow-sm tooltip">
      {props.items.map((item, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === props.items.length - 1;
        const isSelected = item.id === props.value;
        const isDisabled = props.disabled || item.disabled;
        return (
          <button
            key={item.id}
            type="button"
            className={classNames(
              defaultCSS,
              isFirstItem ? firstItemCSS : notFirstItemCSS,
              isLastItem ? lastItemCSS : "",
              isSelected ? selectedItemCSS : notSelectedItemCSS,
            )}
            style={{ width: widthWorkaround }}
            disabled={isDisabled}
            onClick={() => !isDisabled && props.onChange(item.id)}
          >
            {item.label}
          </button>
        );
      })}
      {props.disabled && props.disabledText && <TooltipComponent text={props.disabledText} />}
    </span>
  );
};
