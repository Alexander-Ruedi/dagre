import React, { InputHTMLAttributes } from "react";
import { classNames } from "../../../../utils/StylingUtil";

interface DatePickerInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  customClasses: string;
  maxChars: number;
  onChange: (newValue: string) => void;
}
export const DatePickerInput = (props: DatePickerInputProps) => {
  const { customClasses, onChange, maxChars, ...otherProps } = props;

  const changeInterceptor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target?.value?.toString().slice(0, maxChars);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      {...otherProps}
      onClick={(event) => event.stopPropagation()}
      onChange={changeInterceptor}
      className={classNames(
        customClasses,
        "text-center placeholder:text-center focus:text-left px-1 border border-gray-200 bg-white text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-default disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm",
      )}
    />
  );
};
