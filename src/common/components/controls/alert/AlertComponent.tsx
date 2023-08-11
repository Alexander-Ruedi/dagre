import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../../utils/StylingUtil";

type AlertType = "INFO" | "WARNING" | "ERROR" | "SUCCESS";

const getBackgroundColor = (alertType: AlertType) => {
  switch (alertType) {
    case "INFO":
      return "bg-blue-50";
    case "ERROR":
      return "bg-red-50";
    case "SUCCESS":
      return "bg-green-50";
    case "WARNING":
      return "bg-yellow-50";
    default:
      return "";
  }
};

const getTextColor = (alertType: AlertType) => {
  switch (alertType) {
    case "INFO":
      return "text-blue-700";
    case "ERROR":
      return "text-red-800";
    case "SUCCESS":
      return "text-green-400";
    case "WARNING":
      return "text-yellow-800";
    default:
      return "";
  }
};

const getIcon = (alertType: AlertType) => {
  switch (alertType) {
    case "INFO":
      return <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />;
    case "ERROR":
      return <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />;
    case "SUCCESS":
      return <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />;
    case "WARNING":
      return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />;
    default:
      return "";
  }
};

interface AlertProps {
  text: string;
  type: AlertType;
}

export const AlertComponent = (props: AlertProps) => {
  return (
    <div className={classNames("rounded-md p-4", getBackgroundColor(props.type))}>
      <div className="flex">
        <div className="flex-shrink-0">{getIcon(props.type)}</div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className={classNames("text-sm", getTextColor(props.type))}>{props.text}</p>
        </div>
      </div>
    </div>
  );
};
