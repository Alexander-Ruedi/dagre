import { defaultSmallInputStyle } from "./DefaultInputStyle";

interface TextProps {
  label: string;
  onChange: (text: string) => void;
  value?: string;
  disabled?: boolean;
}

export const SmallTextInputComponent = (props: TextProps) => {
  return (
    <div className="relative w-full h-[30px]">
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          {props.label}
        </label>
        <div className="flex h-[30px]">
          <input
            name="search"
            className={defaultSmallInputStyle}
            placeholder={props.label}
            type="text"
            onChange={(e: any) => {
              props.onChange(e.target.value);
            }}
            value={props.value}
            disabled={props.disabled}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};
