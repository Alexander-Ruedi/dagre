import { PaperClipIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { classNames } from "../../../utils/StylingUtil";
import { TooltipActionButtonComponent } from "../../table/tooltip/TooltipActionButtonComponent";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";

interface FileProps {
  onChange: (file: File | undefined) => void;
  file?: File;
  fileTypes: string;
}

const defaultDragCSS = "mt-1 flex justify-center rounded-md border-2 px-6 pt-5 pb-6 bg-white ";
const activeDragCSS = "border-indigo-600 ";
const inactiveDragCSS = "border-dashed border-gray-300 shadow ";
const deleteIcon = <TrashIcon className="h-5 w-5" />;

export const FileComponent = (props: FileProps) => {
  const [isInDropZone, setIsInDropZone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dropHandler = (ev: any) => {
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      const files = [...ev.dataTransfer.items];
      if (files.length > 1) {
        alert("Please upload only one file at a time!");
      } else {
        if (files[0].kind === "file") {
          const file = files[0].getAsFile();
          const isAllowed = isAllowedFile(file.name, props.fileTypes);
          if (isAllowed) {
            setFile(file);
          } else {
            alert("This file type is not supported");
          }
        }
      }
    }

    setTimeout(() => {
      setIsInDropZone(false);
    }, 250);
  };

  const isAllowedFile = (filename: string, fileTypes: string) => {
    const allowedFileTypes = fileTypes.split(", ");
    return allowedFileTypes.some((allowedFileType) => filename.indexOf(allowedFileType) > 0);
  };

  const fileChangeHandler = (ev: any) => {
    const files = [...ev.target.files];
    if (files.length > 1) {
      alert("Please upload only one file at a time!");
    } else {
      setFile(files[0]);
    }
  };

  const setFile = (file?: File) => {
    props.onChange(file);
    if (inputRef.current && file === undefined) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div
        className={classNames(isInDropZone ? defaultDragCSS + activeDragCSS : defaultDragCSS + inactiveDragCSS)}
        onDrop={dropHandler}
        onDragOver={(event: any) => {
          event.preventDefault();
          setIsInDropZone(true);
        }}
        onDragLeave={() => setIsInDropZone(false)}
      >
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>

          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept={props.fileTypes}
                className="sr-only"
                onChange={fileChangeHandler}
                ref={inputRef}
                data-testid="fileInput"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">Excel File up to 10MB</p>
        </div>
      </div>
      {props.file ? (
        <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200 mt-2 bg-white">
          <li key="filename1" className="flex items-center justify-between py-2 pl-3 pr-1 text-sm">
            <div className="flex w-0 flex-1 items-center relative">
              <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span className="ml-2 w-0 flex-1 truncate" data-testid="selectedFileLabel">
                {props.file?.name}
              </span>
              <div className="absolute right-0 tooltip tooltip-left">
                <TooltipActionButtonComponent hoverText="Delete" onClick={() => setFile(undefined)} icon={deleteIcon} />
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};
