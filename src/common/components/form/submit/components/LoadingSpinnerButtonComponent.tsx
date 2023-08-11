import { classNames } from "../../../../utils/StylingUtil";
import { TooltipComponent } from "../../../table/tooltip/TooltipComponent";
import { SpinnerComponent } from "./SpinnerComponent";

export enum LoadingStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
}
interface LoadingSpinnerProps {
  status?: LoadingStatus;
  onClick: () => void;
  disabled?: boolean;
  disabledText?: string;
  disabledTextDirection?: "normal" | "left";
  label?: string;
}
export const LoadingSpinnerButtonComponent = (props: LoadingSpinnerProps) => {
  const isLoading = props.status === LoadingStatus.LOADING;

  return (
    <button
      onClick={() => !isLoading && props.onClick()}
      className={classNames(
        isLoading ? "cursor-wait" : "cursor-pointer",
        "shadow-gray-600 ml-3 inline-flex justify-center rounded-md bg-msg-red border border-gray-400 py-2 px-4 text-sm font-medium text-white  disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-default tooltip",
        props.disabledTextDirection && props.disabledTextDirection === "left" ? "tooltip-left" : "",
      )}
      disabled={isLoading || props.disabled}
      data-testid="submitButton"
    >
      {<SpinnerComponent isLoading={isLoading} />}
      <span>{props.label || "Save"}</span>
      {props.disabled && props.disabledText && <TooltipComponent text={props.disabledText} />}
    </button>
  );
};
