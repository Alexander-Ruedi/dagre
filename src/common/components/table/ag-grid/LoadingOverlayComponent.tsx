import { SpinnerComponent } from "../../form/submit/components/SpinnerComponent";

import "./styles/styles.css";

export const LoadingOverlayComponent = () => {
  return (
    <div className="custom-loading-overlay">
      <div className="shadow-gray-600 ml-3 inline-flex justify-center rounded-md bg-white border border-gray-400 py-2 px-4 text-sm font-medium text-gray-500 cursor-wait">
        {<SpinnerComponent isLoading={true} />}

        <span>{"Loading"}</span>
      </div>
    </div>
  );
};

export const OVERLAY_LOADING_TEMPLATE =
  '<div class="custom-loading-overlay"><div class="shadow-gray-600 ml-3 inline-flex justify-center rounded-md bg-white border border-gray-400 py-2 px-4 text-sm font-medium text-gray-500 cursor-wait"><div class="mr-2 w-5 opacity-100"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-1 animate-spin stroke-current stroke-[3]" fill="none" viewBox="0 0 24 24">  <path  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"  class="stroke-current opacity-25"  />  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19" /></svg></div>  <span>Loading</span></div></div>';

export const OVERLAY_ERROR_TEMPLATE =
  '<div class="custom-loading-overlay"><div class="shadow-gray-600 ml-3 inline-flex justify-center rounded-md bg-white border border-gray-400 py-2 px-4 text-sm font-medium text-gray-500"><span>Error occurred</span></div></div>';
