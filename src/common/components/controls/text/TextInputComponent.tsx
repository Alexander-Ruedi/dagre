import { defaultInputStyle } from "./DefaultInputStyle";

interface TextProps {
  label: string;
  onChange: (text: string) => void;
  value?: string;
  disabled?: boolean;
  inputProps?: any;
}

export const TextInputComponent = (props: TextProps) => {
  return (
    <div className="relative w-full">
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          {props.label}
        </label>
        <div className="relative">
          <input
            name="search"
            className={defaultInputStyle}
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
