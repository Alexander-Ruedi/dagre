import { Switch } from "@headlessui/react";
import { classNames } from "../../../utils/StylingUtil";

interface ToogleButtonProps {
  label: string;
  description?: string;
  disabled?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const ToggleButtonComponent = (props: ToogleButtonProps) => {
  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <span className="flex flex-grow flex-col">
        <Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
          {props.label}
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-gray-500">
          {props.description}
        </Switch.Description>
      </span>
      <Switch
        checked={props.checked}
        onChange={props.onChange}
        className={classNames(
          props.checked ? "bg-indigo-600" : "bg-gray-200",
          "ml-3 relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            props.checked ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          )}
        />
      </Switch>
    </Switch.Group>
  );
};
