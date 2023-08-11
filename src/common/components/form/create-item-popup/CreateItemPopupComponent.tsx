import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { FormModesModel } from "../../../models/common/FormPropsModel";
import { ReducerModel } from "../../../store/models/ReducerMapModel";
import { getPageByNavigation } from "../../routing/data/PageData";
import { NavigationLinks } from "../../table/models/TableModel";
import { getCreatePopupContent } from "./util/CreatePopupUtil";

interface CreateItemPopupProps {
  table?: NavigationLinks;
  onClose: () => void;
  onCreated: (newItem: any) => void;
  onModified: (modifiedItem: any) => void;
  open: boolean;
}

export const CreateItemPopupComponent = (props: CreateItemPopupProps) => {
  const markupPopupMode = useSelector((state: ReducerModel) => state.markup.popup.mode);

  const isEditableTable = props.table === NavigationLinks.MarkUps;
  const titleVerb = isEditableTable && markupPopupMode === FormModesModel.EDIT ? "Edit " : "Create new ";
  const title = props.table ? titleVerb + getPageByNavigation(props.table).singularLabel : "";

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all ">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      props.onClose();
                    }}
                    tabIndex={-1}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      {props.table &&
                        getCreatePopupContent(
                          props.table,
                          (newId) => props.onCreated(newId),
                          (newId) => props.onModified(newId),
                          () => props.onClose(),
                        )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
