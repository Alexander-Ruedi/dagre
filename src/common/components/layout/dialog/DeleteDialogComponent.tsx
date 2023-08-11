import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, MinusSmallIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useRef, useState } from "react";
import { getPageByNavigation, PagesModel } from "../../routing/data/PageData";
import { LoadingSpinnerDialogButtonComponent } from "./components/LoadingSpinnerButtonComponent";

interface DeleteDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  currentPage: PagesModel;
  text?: string;
}

export const DeleteDialogComponent = (props: DeleteDialogProps) => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const { text } = props;
  const { relatedDelete } = props.currentPage;

  const hasRelatedDelete = relatedDelete && relatedDelete.length > 0;
  const relatedDeleteText = hasRelatedDelete && " This will permanently delete related data in following features:";

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          setTimeout(() => {
            props.onCancel();
          }, 250);
        }}
      >
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Irreversible action
                    </Dialog.Title>
                    <div className="my-2">
                      <p className="text-sm text-gray-500">{text ?? relatedDeleteText ?? "Are you sure you want to delete?"}</p>
                      {relatedDelete && (
                        <ul className="text-gray-500 mt-2 text-sm font-normal">
                          {relatedDelete?.map((feature) => (
                            <li key={feature} className="flex flex-row items-center">
                              <span className="h-full ">
                                <MinusSmallIcon className="h-3 w-3 mr-1" />
                              </span>
                              <span>{getPageByNavigation(feature).title}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
                  <button
                    type="button"
                    className="mr-2 w-1/2 justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-base font-medium text-gray-500 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => props.onCancel()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>

                  <LoadingSpinnerDialogButtonComponent onClick={props.onConfirm} label="Delete" isLoading={props.isLoading} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
