import { SpinnerComponent } from "../../form/submit/components/SpinnerComponent";
import { SmallActionButtonComponent } from "./SmallActionButtonComponent";

interface EditButtonProps {
  text: string;
  isDisabled?: boolean;
  onClick: () => void;
  isLoading?: boolean;
  disabledText?: string;
  disabledTextDirection?: "normal" | "left";
}

export const SmallActionButtonComponentWithLoadingIcon = (props: EditButtonProps) => {
  const icon = <SpinnerComponent isLoading={props.isLoading ?? false} />;
  return (
    <div className="flex max-h-full">
      <SmallActionButtonComponent
        onClick={() => props.onClick()}
        text={props.text}
        disabled={props.isDisabled}
        disabledText={props.disabledText}
        disabledTextDirection={props.disabledTextDirection}
        isLoading={props.isLoading}
        icon={icon}
      />
    </div>
  );
};
