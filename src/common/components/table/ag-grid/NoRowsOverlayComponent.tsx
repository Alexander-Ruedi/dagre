import "./styles/styles.css";

export const NoRowsOverlayComponent = () => {
  return (
    <div className="custom-loading-overlay">
      <div className="shadow-gray-600 ml-3 inline-flex justify-center rounded-md bg-white border border-gray-400 py-2 px-4 text-sm font-medium text-gray-500 cursor-wait">
        <span>{"No data available"}</span>
      </div>
    </div>
  );
};

export const OVERLAY_NO_ROWS_TEMPLATE =
  '<div class="custom-loading-overlay">    <div class="shadow-gray-600 ml-3 inline-flex justify-center rounded-md bg-white border border-gray-400 py-2 px-4 text-sm font-medium text-gray-500 cursor-wait">      <span>No data available</span>    </div>  </div>';
