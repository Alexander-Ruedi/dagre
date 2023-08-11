import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../../utils/StylingUtil";
import { TooltipComponent } from "../tooltip/TooltipComponent";

interface ViewHistoryProps {
  onHistoryChange: (direction: number) => void;
  isUndoDisabled: boolean;
  isRedoDisabled: boolean;
}

export const ViewHistoryComponent = (props: ViewHistoryProps) => {
  return (
    <div className="relative inline-flex text-left ml-1 max-h-[30px]">
      <div className="flex max-h-full">
        <button
          onClick={() => props.onHistoryChange(-1)}
          className={classNames(
            props.isUndoDisabled ? "text-gray-400 bg-white" : "text-gray-700 bg-white hover:bg-gray-200",
            "rounded-l-md inline-flex justify-between px-2 py-1 text-sm text-left",
            " tooltip",
          )}
          disabled={props.isUndoDisabled}
        >
          <ArrowSmallLeftIcon className="h-5 w-5" aria-hidden="true" />
          <TooltipComponent text={"Undo changes (view only)"} />
        </button>
        <button
          onClick={() => props.onHistoryChange(1)}
          className={classNames(
            props.isRedoDisabled ? "text-gray-400 bg-white" : "text-gray-700 bg-white hover:bg-gray-200",
            "rounded-r-md inline-flex justify-between px-2 py-1 text-sm text-left",
            " tooltip",
          )}
          disabled={props.isRedoDisabled}
        >
          <ArrowSmallRightIcon className="h-5 w-5" aria-hidden="true" />
          <TooltipComponent text={"Redo changes (view only)"} />
        </button>
      </div>
    </div>
  );
};
