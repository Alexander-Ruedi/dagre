import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { classNames } from "../../../utils/StylingUtil";
import { TooltipComponent } from "../../table/tooltip/TooltipComponent";
import { DropdownModel } from "../dropdown/models/DropdownModel";

interface DropdownProps {
  placeholder?: string;
  items: Array<DropdownModel>;
  onChange: (id?: string) => void;
  value?: string | null;
  disabled?: boolean;
  hasRedStyling?: boolean;
  maximumItemsToRender?: number;
  keepOrder?: boolean;
  disabledText?: string;
  ignoreMissingItems?: boolean;
}

export const ComboboxComponent = (props: DropdownProps) => {
  const [query, setQuery] = useState("");
  const defaultMaximumItemsToRender = props.maximumItemsToRender || 50;
  const [maxItemsToRender, setMaxItemsToRender] = useState(defaultMaximumItemsToRender);
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const sortedItems = props.keepOrder ? props.items.slice() : props.items.slice().sort((a, b) => a.label.localeCompare(b.label));
  const filteredItems =
    query === ""
      ? sortedItems
      : sortedItems.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  const hasNotRenderedItems = filteredItems.length > maxItemsToRender;
  const reducedItems = hasNotRenderedItems ? filteredItems.slice(0, maxItemsToRender) : filteredItems;

  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const activeOptionRef = useRef<HTMLLIElement>(null);
  const onClickOutside = useDetectOutsideClick(comboboxRef);
  onClickOutside.subscribe(() => setOptionsVisible(false));

  useEffect(() => {
    if (activeOptionRef.current && optionsVisible) {
      optionsRef.current?.scrollTo({
        top: activeOptionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [optionsVisible]);

  useEffect(() => {
    const hasItems = () => props.items && props.items.length > 0;
    const hasValue = () => props.value != null && props.value !== "";
    const isValueInItems = sortedItems.find((item) => item.id === props.value);

    if (!props.ignoreMissingItems && hasValue() && hasItems() && !isValueInItems) {
      props.onChange(undefined);
    }
  }, [props.value, props.items]);

  return (
    <div className="z-1 relative cursor-pointer" ref={comboboxRef}>
      <Combobox
        as="div"
        value={props.value || ""}
        onChange={(id: string) => {
          props.onChange(id);
          setQuery("");
          setOptionsVisible(false);
        }}
        disabled={props.disabled}
      >
        <div className="relative w-full tooltip">
          <Combobox.Input
            ref={inputRef}
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm  disabled:cursor-default disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(id: any) => {
              const currentItem = sortedItems.filter((item) => item.id === id);
              if (currentItem.length > 0) {
                return currentItem[0].label;
              } else if (query.length > 0) {
                return query;
              } else if (props.placeholder) {
                return props.placeholder;
              }
              return props.placeholder || "";
            }}
            onClick={() => {
              inputRef.current?.select();
              inputRef.current && setQuery("");
              setOptionsVisible(true);
            }}
            autoComplete="off"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" onClick={() => setQuery("")} />
          </Combobox.Button>
          {props.disabled && props.disabledText && <TooltipComponent text={props.disabledText} />}
          {sortedItems && (
            <Combobox.Options
              ref={optionsRef}
              static={optionsVisible}
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {reducedItems.map((item) => (
                <Combobox.Option
                  key={item.id}
                  value={item.id}
                  ref={item.id === props.value ? activeOptionRef : undefined}
                  className="relative cursor-pointer select-none py-2 pl-8 pr-4 hover:bg-indigo-600 text-gray-900 hover:text-white"
                >
                  {({ selected }) => (
                    <div className="w-full">
                      <span className={classNames("block truncate", selected ? "font-semibold" : "")}>{item.label}</span>

                      {selected && (
                        <span className={classNames("absolute inset-y-0 left-0 flex items-center pl-1.5")}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  )}
                </Combobox.Option>
              ))}
              {hasNotRenderedItems && (
                <li
                  className="relative cursor-default select-none py-2 pl-8 pr-4  hover:bg-indigo-600 text-gray-900 hover:text-white"
                  id="headlessui-combobox-option-:r41h:"
                  role="option"
                  tabIndex={-1}
                  aria-selected="false"
                  data-headlessui-state=""
                  onClick={() => setMaxItemsToRender(maxItemsToRender + defaultMaximumItemsToRender)}
                >
                  <span className="block truncate">Show more items</span>
                </li>
              )}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};
