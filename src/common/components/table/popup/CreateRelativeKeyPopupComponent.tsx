import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EventType, useNotificationHandler } from "../../../hooks/useNotificationHandlers";
import { defaultInputStyle } from "../../controls/text/DefaultInputStyle";
import { ErrorTextComponent } from "../../form/validation/ErrorTextComponent";
import { LoadingSpinnerDialogButtonComponent } from "../../layout/dialog/components/LoadingSpinnerButtonComponent";

interface DialogProps {
  forbiddenNames: Array<string>;
  onCancel: () => void;
  onConfirm: (name: string) => void;
}

interface CreateRelativeKeyInterface {
  name: string;
}

export const CreateRelativeKeyPopupComponent = (props: DialogProps) => {
  const [open, setOpen] = useState(true);

  const { notifySuccess } = useNotificationHandler();
  const createSchema = z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .refine((newName) => props.forbiddenNames && props.forbiddenNames.indexOf(newName) === -1, {
        message: "There is already a master key with the same name.",
      }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateRelativeKeyInterface>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: "" },
    mode: "onTouched",
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Enter name
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Please enter a name for the new relative key.</p>
                    </div>
                    <div className="col-span-3 mt-2">
                      <div className="mt-1">
                        <input type="text" className={defaultInputStyle} {...register("name")} />
                      </div>
                      <ErrorTextComponent message={errors.name?.message} />
                    </div>
                  </div>
                </div>

                <div className="w-full mt-8 flex">
                  <button
                    type="button"
                    className="mr-2 w-1/2 justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-base font-medium text-gray-500 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => {
                      setOpen(false);
                      props.onCancel();
                    }}
                  >
                    Cancel
                  </button>

                  <LoadingSpinnerDialogButtonComponent
                    onClick={handleSubmit((relativeKey) => {
                      setOpen(false);
                      props.onConfirm(relativeKey.name);
                    })}
                    label="Save"
                    isLoading={false}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
