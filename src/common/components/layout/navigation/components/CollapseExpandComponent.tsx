import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

interface CollapseExpandProps {
  isCollapsed: boolean;
  onToggle: (isCollapsed: boolean) => void;
}
export const CollapseExpandComponent = (props: CollapseExpandProps) => {
  const collapsedIcon = <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />;
  const expandedIcon = <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />;
  const icon = props.isCollapsed ? collapsedIcon : expandedIcon;

  const buttonClasses =
    "inline-flex justify-center w-10 p-2 m-2 rounded-md text-msg-red text-sm font-medium shadow-sm focus:outline-none  hover:bg-gray-200";
  return (
    <button className={buttonClasses} onClick={() => props.onToggle(!props.isCollapsed)}>
      {icon}
    </button>
  );
};
