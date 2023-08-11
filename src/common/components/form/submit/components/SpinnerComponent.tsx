import { classNames } from "../../../../utils/StylingUtil";

interface SpinnerProps {
  isLoading: boolean;
}
export const SpinnerComponent = (props: SpinnerProps) => {
  return (
    <div className={classNames(props.isLoading ? "mr-2 w-5 opacity-100" : "w-0 opacity-0")} style={{ transition: "all 0.2s" }}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-1 animate-spin stroke-current stroke-[3]" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          className="stroke-current opacity-25"
        />
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19" />
      </svg>
    </div>
  );
};
