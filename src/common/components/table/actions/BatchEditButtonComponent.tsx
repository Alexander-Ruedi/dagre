import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { DisabledReason } from "../../../utils/DisabledTextUtil";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";
import { NavigationLinks } from "../models/TableModel";

interface EditButtonProps {
  table: NavigationLinks;
  isDisabled?: boolean;
  onClick: () => void;
}

export const BatchEditButtonComponent = (props: EditButtonProps) => {
  const icon = <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />;
  return (
    <div className="flex max-h-full">
      <SmallActionButtonComponent
        onClick={() => props.onClick()}
        icon={icon}
        text={"Edit"}
        disabled={props.isDisabled}
        disabledText={DisabledReason.BATCH_EDIT_DISABLED}
        disabledTextDirection="left"
      />
    </div>
  );
};
