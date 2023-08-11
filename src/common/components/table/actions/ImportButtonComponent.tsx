import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import { DisabledReason } from "../../../utils/DisabledTextUtil";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";

interface ImportButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
export const ImportButtonComponent = (props: ImportButtonProps) => {
  const icon = <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />;
  return (
    <div className="flex max-h-full">
      <SmallActionButtonComponent
        onClick={props.onClick}
        icon={icon}
        text={"Import"}
        disabled={props.disabled}
        disabledText={DisabledReason.PREREQUISITES_NOT_MET}
        disabledTextDirection="left"
        testId="importButton"
      />
    </div>
  );
};
