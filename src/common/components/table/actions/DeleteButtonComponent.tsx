import { TrashIcon } from "@heroicons/react/24/outline";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";

interface ManualDeleteButtonProps {
  disabled?: boolean;
  onClick: () => void;
  disabledText?: string;
  disabledTextDirection?: "normal" | "left";
}
export const DeleteButtonComponent = (props: ManualDeleteButtonProps) => {
  const icon = <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />;
  return (
    <SmallActionButtonComponent
      onClick={() => {
        props.onClick();
      }}
      icon={icon}
      text={"Delete"}
      disabled={props.disabled}
      disabledText={props.disabledText}
      disabledTextDirection={props.disabledTextDirection}
    />
  );
};
