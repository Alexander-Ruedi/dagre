import { XCircleIcon } from "@heroicons/react/20/solid";

interface ErrorTextProps {
  message?: string;
}
export const BackendErrorTextComponent = (props: ErrorTextProps) => {
  return (
    <div className="rounded-md bg-red-50 p-4 mx-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{props.message}</h3>
        </div>
      </div>
    </div>
  );
};
