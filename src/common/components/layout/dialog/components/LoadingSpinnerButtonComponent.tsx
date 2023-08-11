import { classNames } from "../../../../utils/StylingUtil";
import { SpinnerComponent } from "../../../form/submit/components/SpinnerComponent";

export enum LoadingStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
}
interface LoadingSpinnerProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  isLoading?: boolean;
}
export const LoadingSpinnerDialogButtonComponent = (props: LoadingSpinnerProps) => {
  return (
    <button
      onClick={() => !props.isLoading && props.onClick()}
      className={classNames(
        props.isLoading ? "cursor-wait" : "cursor-pointer",
        "mr-2 w-1/2  shadow-gray-600 ml-3 inline-flex justify-center rounded-md bg-msg-red border border-gray-400 py-2 px-4 text-sm font-medium text-white  disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500",
      )}
      disabled={props.isLoading || props.disabled}
      data-testid="submitButton"
    >
      {<SpinnerComponent isLoading={props.isLoading || false} />}
      <span>{props.label || "Save"}</span>
    </button>
  );
};
