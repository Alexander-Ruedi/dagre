import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode } from "react";
import { SavedView } from "../../../store/slices/custom-views/CustomViewsSliceModel";
import { classNames } from "../../../utils/StylingUtil";
import { defaultButtonStyle } from "../../controls/button/DefaultStyling";
import { TooltipComponent } from "../tooltip/TooltipComponent";

interface ViewComponentProps {
  onInitialViewClicked: () => void;
  onSaveCustomView: () => void;
  savedViews: Array<SavedView>;
  onApplySavedView: (newView: SavedView) => void;
  onDeleteSavedView: (viewName: string) => void;
  viewName: string;
  children?: ReactNode;
}

export const ViewComponent = (props: ViewComponentProps) => {
  const isAddDisabled = false;
  return (
    <Menu as="div" className="relative inline-block text-left ml-3 max-h-[30px]">
      <div className="flex max-h-full">
        <Menu.Button
          className={
            defaultButtonStyle +
            "inline-flex w-full justify-center items-center rounded-md border border-gray-300 px-2.5 py-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          }
          data-testid="customView"
        >
          View
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          data-testid="viewPopup"
        >
          <div className="py-1">
            <div className="w-full flex justify-between">
              <div>{props.children}</div>
              <Menu.Item>
                <button
                  onClick={() => {
                    props.onSaveCustomView();
                  }}
                  className={classNames(
                    isAddDisabled ? "text-gray-400" : "text-msg-red hover:shadow-sm hover:bg-gray-200 disabled:bg-gray-200 disabled:text-msg-gray",
                    "bg-transparent rounded-md inline-flex p-1 mr-1 text-sm text-left tooltip",
                  )}
                  disabled={isAddDisabled}
                  data-testid="saveCustomView"
                >
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  <TooltipComponent text={"Add view"} />
                </button>
              </Menu.Item>
            </div>
          </div>
          <div className="w-full h-full" data-testid="allCustomViews">
            <Menu.Item>
              <span
                onClick={() => props.onInitialViewClicked()}
                className={classNames(
                  props.viewName === "Initial view" ? "" : "hover:bg-gray-100 hover:text-gray-900 cursor-pointer",
                  "inline-flex pl-2 pr-4 py-2 text-sm w-full text-left",
                )}
                data-testid="applyInitialView"
              >
                <CheckIcon
                  className={classNames(props.viewName === "Initial view" ? "text-black" : "text-transparent", "h-5 w-5")}
                  aria-hidden="true"
                />
                <span className="ml-2 grow">Initial view</span>
              </span>
            </Menu.Item>
            {props.savedViews &&
              props.savedViews.map((savedView) => (
                <Menu.Item key={savedView.name}>
                  <span
                    onClick={() => savedView.name && props.onApplySavedView(savedView)}
                    className={classNames(
                      props.viewName === savedView.name ? "" : "hover:bg-gray-100 hover:text-gray-900 cursor-pointer",
                      "text-gray-700 inline-flex justify-between px-2 pr-0 text-sm w-full text-left",
                    )}
                  >
                    <CheckIcon
                      className={classNames(props.viewName === savedView.name ? "text-black" : "text-transparent", "h-5 w-5 my-2")}
                      aria-hidden="true"
                    />
                    <span className="ml-2 grow py-2">{savedView.name}</span>
                    <span className="my-1 h-full w-9">
                      <TrashIcon
                        className={classNames(
                          props.viewName === savedView.name ? "hover:bg-gray-200" : "hover:bg-gray-300",
                          "p-1 mx-1 rounded-md hover:shadow-sm  cursor-pointer text-msg-red",
                        )}
                        aria-hidden="true"
                        onClick={(event) => {
                          event.stopPropagation();
                          savedView.name && props.onDeleteSavedView(savedView.name);
                        }}
                        data-testid="deleteView"
                      />
                    </span>
                  </span>
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
