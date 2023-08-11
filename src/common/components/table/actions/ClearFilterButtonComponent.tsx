import { FunnelIcon } from "@heroicons/react/24/outline";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";

interface ClearFilterProps {
  onClick: () => void;
  isDisabled: boolean;
}
export const ClearFilterButtonComponent = (props: ClearFilterProps) => {
  const icon = <FunnelIcon className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />;

  return (
    <div className="flex max-h-full">
      <SmallActionButtonComponent icon={icon} text={"Clear filter"} onClick={() => props.onClick()} disabled={props.isDisabled} />
    </div>
  );
};
