import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { classNames } from "../../../utils/StylingUtil";
import { AutocompleteListComponent } from "./components/AutocompleteListComponent";
import { BadgeComponent } from "./components/BadgeComponent";
import { AutocompleteItemModel } from "./models/AutocompleteItemModel";

export interface AutocompleteProps {
  placeholder?: string;
  items: Array<AutocompleteItemModel>;
  onChange: (values: Array<AutocompleteItemModel>) => void;
  disabled: boolean;
  actionItem: string;
  onActionItem: () => void;
}

export const ActionAutocompleteComponent = (props: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const autoCompleteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickOutside = useDetectOutsideClick(autoCompleteRef);
  onClickOutside.subscribe({
    next() {
      setIsOpen(false);
      setIsFocused(false);
    },
  });

  const removeItem = (itemToRemove: AutocompleteItemModel) => {
    const updatedItems = [...props.items];
    updatedItems.forEach((item) => {
      if (item.id === itemToRemove.id) {
        item.active = false;
      }
    });
    props.onChange(updatedItems);
    setIsFocused(true);
  };

  const addItem = (itemToRemove: AutocompleteItemModel) => {
    const updatedItems = [...props.items];
    updatedItems.forEach((item) => {
      if (item.id === itemToRemove.id) {
        item.active = true;
      }
    });
    props.onChange(updatedItems);
  };

  const clearAllItems = () => {
    const updatedItems = [...props.items];
    updatedItems.forEach((item) => {
      item.active = false;
    });
    props.onChange(updatedItems);
  };

  return (
    <div
      ref={autoCompleteRef}
      onClick={() => {
        setIsFocused(true);
        if (!props.disabled) {
          setIsOpen(true);
          inputRef.current?.focus();
        }
      }}
    >
      <div
        className={classNames(
          "w-full border-gray-300 shadow-sm border rounded-md min-h-[42px] relative pb-1",
          isFocused ? "border-msg-red border-2 -m-[1px]" : "border-gray-300",
          !props.disabled ? "pr-10" : "",
        )}
      >
        {!props.disabled && (
          <span
            className={classNames("absolute rounded-md top-0 hover:bg-gray-100 pl-3 cursor-pointer h-full", isFocused ? "right-0" : " right-[2px]")}
            onClick={clearAllItems}
          >
            <XMarkIcon className="h-full w-5 mr-2 inline align-middle" aria-hidden="true" />
          </span>
        )}
        {props.items &&
          props.items.map((item) => {
            return item.active ? <BadgeComponent key={item.id} item={item} onRemove={removeItem} disabled={props.disabled} /> : <></>;
          })}
        {!props.disabled && (
          <span className="h-[32px] w-[200px] inline-block mt-1">
            <input
              ref={inputRef}
              type="text"
              placeholder={props.placeholder}
              className="ml-3 p-0 align-middle h-full border-transparent focus:border-transparent focus:ring-0"
              onChange={(event) => {
                if (event.target) {
                  setSearchTerm(event.target.value);
                }
              }}
              autoComplete="off"
            />
          </span>
        )}
      </div>

      <div className="w-full">
        {!props.disabled && (
          <AutocompleteListComponent
            searchTerm={searchTerm}
            items={props.items}
            onAdd={addItem}
            isOpen={isOpen}
            actionItem={props.actionItem}
            onActionItem={() => props.onActionItem()}
          />
        )}
      </div>
    </div>
  );
};
