import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";
import { PresentationChartLineIcon } from "@heroicons/react/24/outline";

export interface ActionProps {
  onClick: () => void;
  disabled?: boolean;
  disabledText?: string;
}
export const VisualizeButtonComponent = (props: ActionProps) => {
  const icon = <PresentationChartLineIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />;
  return (
    <SmallActionButtonComponent
      onClick={() => {
        props.onClick();
      }}
      icon={icon}
      text={"Visualize"}
      disabled={props.disabled}
      disabledText={props.disabledText}
    />
  );
};
