import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { DisabledReason } from "../../../utils/DisabledTextUtil";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";

interface ExportButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}

export const ExportButtonComponent = (props: ExportButtonProps) => {
  const icon = <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />;
  return (
    <div className="flex max-h-full">
      <SmallActionButtonComponent
        onClick={props.onClick}
        icon={icon}
        text={props.text ? props.text : "Export"}
        disabled={props.disabled}
        disabledText={DisabledReason.PREREQUISITES_NOT_MET}
        disabledTextDirection="left"
      />
    </div>
  );
};
