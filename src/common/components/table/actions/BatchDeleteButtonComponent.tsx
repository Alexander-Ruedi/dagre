import { TrashIcon } from "@heroicons/react/24/outline";
import { DisabledReason } from "../../../utils/DisabledTextUtil";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";

interface BatchDeleteProps {
  onClick: () => void;
  isDisabled: boolean;
}

export const BatchDeleteButtonComponent = (props: BatchDeleteProps) => {
  const icon = <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />;
  return (
    <div className="flex max-h-full">
      <SmallActionButtonComponent
        icon={icon}
        text={"Delete"}
        onClick={() => props.onClick()}
        disabled={props.isDisabled}
        disabledText={DisabledReason.BATCH_DELETE_DISABLED}
        disabledTextDirection="left"
        testId="batchDeleteButton"
      />
    </div>
  );
};
