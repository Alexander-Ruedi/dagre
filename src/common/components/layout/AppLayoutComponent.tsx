import { Outlet } from "react-router-dom";
import NavigationComponent from "./navigation/NavigationComponent";

export const AppLayoutComponent = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row h-full z-10">
        <NavigationComponent />
        <div className="flex flex-col grow">
          <div className="flex overflow-auto grow bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
