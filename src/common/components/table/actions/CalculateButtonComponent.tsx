import { CalculatorIcon } from "@heroicons/react/24/outline";
import { SmallActionButtonComponent } from "../../controls/button/SmallActionButtonComponent";
import { SpinnerComponent } from "../../form/submit/components/SpinnerComponent";

interface CalculateButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  isLoading: boolean;
}

export const CalculateButtonComponent = (props: CalculateButtonProps) => {
  const loadingIcon = <SpinnerComponent isLoading={true} />;
  const defaultIcon = <CalculatorIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />;

  return (
    <div className="flex max-h-full">
      <SmallActionButtonComponent
        icon={props.isLoading ? loadingIcon : defaultIcon}
        text={"Calculate amount"}
        onClick={() => props.onClick()}
        disabled={props.isDisabled || props.isLoading}
        isLoading={props.isLoading}
      />
    </div>
  );
};
