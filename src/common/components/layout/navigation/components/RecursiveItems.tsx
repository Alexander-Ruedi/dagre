import { Disclosure } from "@headlessui/react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../../utils/StylingUtil";
import { NavigationModel } from "../data/NavigationData";
import { LinkItemComponent } from "./LinkItemComponent";
import { getDefaultOpenState } from "./utils/RecursiveItems.util";

interface RecursiveItemsProps {
  item: Array<NavigationModel>;
  showText: boolean;
}

export const RecursiveItems = (props: RecursiveItemsProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const constructListItem = (item: any, hasIndent: boolean) => {
    if (item.children && !item.hidden) {
      return (
        <Disclosure
          as="div"
          key={item.name}
          className={classNames("my-1", hasIndent ? "pl-10" : "")}
          defaultOpen={getDefaultOpenState(item, pathname)}
        >
          {({ open }) => {
            const isDisabled = false;
            return (
              <>
                <Disclosure.Button
                  className={classNames(
                    item.current && isDisabled ? "text-gray-400" : "",
                    !item.current && isDisabled ? "text-gray-400" : "",
                    item.current && !isDisabled ? "text-gray-800 bg-white" : "",
                    !item.current && !isDisabled ? "text-gray-800 bg-gray-100 hover:bg-white" : "",
                    "group flex items-center text-left text-sm font-medium rounded-md 0 p-2 whitespace-nowrap",
                    props.showText ? "pr-1 py-2 w-full" : "",
                  )}
                  onClick={() => {
                    if (item.href && item.isNavigationLink) {
                      navigate(item.href + "/show");
                    }
                  }}
                  disabled={isDisabled}
                >
                  {item.icon && (
                    <item.icon className={classNames("text-gray-500 h-6 w-6 flex-shrink-0", props.showText ? "mr-3" : "")} aria-hidden="true" />
                  )}
                  {props.showText && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      <svg
                        className={classNames(open ? "rotate-90" : "", "text-gray-400 ml-3 h-5 w-5 flex-shrink-0 transform ")}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                      </svg>
                    </>
                  )}
                </Disclosure.Button>
                {props.showText && (
                  <Disclosure.Panel className="space-y-1 my-1">{item.children.map((item: any) => constructListItem(item, true))}</Disclosure.Panel>
                )}
              </>
            );
          }}
        </Disclosure>
      );
    } else if (!item.hidden) {
      return <LinkItemComponent item={item} key={item.name} />;
    }
  };
  return <div>{props.item.map((item) => constructListItem(item, false))}</div>;
};
