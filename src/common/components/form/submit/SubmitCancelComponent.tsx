import { classNames } from "../../../utils/StylingUtil";
import { LoadingSpinnerButtonComponent, LoadingStatus } from "./components/LoadingSpinnerButtonComponent";

interface SubmitCancelProps {
  onSubmit: () => void;
  onCancel: () => void;
  disabled?: boolean;
  isWithinCard?: boolean;
  submitText?: string;
  loadingStatus?: LoadingStatus;
  disabledText?: string;
  disabledTextDirection?: "normal" | "left";
}

export const SubmitCancelComponent = (props: SubmitCancelProps) => {
  return (
    <div className={classNames(props.isWithinCard ? "bg-gray-50 px-3 py-3" : "pt-2 pb-2", " rounded-b-md")} data-testid="submitComponent">
      <div className="flex justify-end">
        <button
          onClick={props.onCancel}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 tooltip"
        >
          Cancel
        </button>
        <LoadingSpinnerButtonComponent
          onClick={props.onSubmit}
          disabled={props.disabled}
          label={props.submitText}
          status={props.loadingStatus}
          disabledText={props.disabledText}
          disabledTextDirection={props.disabledTextDirection}
        />
      </div>
    </div>
  );
};
