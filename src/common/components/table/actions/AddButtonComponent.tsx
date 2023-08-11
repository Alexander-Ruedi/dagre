import { PlusIcon } from "@heroicons/react/20/solid";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";

export interface ActionProps {
  onClick: () => void;
  disabled?: boolean;
  disabledText?: string;
}
export const AddButtonComponent = (props: ActionProps) => {
  const icon = <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />;
  return (
    <SmallActionButtonComponent
      onClick={() => {
        props.onClick();
      }}
      icon={icon}
      text={"Add"}
      disabled={props.disabled}
      disabledText={props.disabledText}
    />
  );
};
