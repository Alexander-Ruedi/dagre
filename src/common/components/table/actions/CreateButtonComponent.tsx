import { PlusIcon } from "@heroicons/react/24/outline";
import { DisabledReason } from "../../../utils/DisabledTextUtil";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";

interface CreateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  disabledText?: string;
}

export const CreateButtonComponent = (props: CreateButtonProps) => {
  const icon = <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />;
  return (
    <div className="flex max-h-full tooltip tooltip-left">
      <SmallActionButtonComponent
        onClick={props.onClick}
        icon={icon}
        text={"Create"}
        disabled={props.disabled}
        disabledText={DisabledReason.PREREQUISITES_NOT_MET}
        testId="createButton"
      />
    </div>
  );
};
