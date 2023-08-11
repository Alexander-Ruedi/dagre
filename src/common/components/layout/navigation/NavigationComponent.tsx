import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/StylingUtil";
import { RecursiveItems } from "./components/RecursiveItems";
import { navigation } from "./data/NavigationData";
import { updateCurrentNavigation } from "./utils/NavigationUtil";

export default function NavigationComponent() {
  const { pathname } = useLocation();
  updateCurrentNavigation(pathname);

  const dispatch = useDispatch();

  const [isMouseOver, setIsMouseOver] = useState(false);

  const mouseWidth = isMouseOver ? "370px" : "58px";
  const isCollapsed = false;
  const finalWidth = isCollapsed ? mouseWidth : "370px";

  const navigate = useNavigate();

  return (
    <div
      id="navigation"
      className=" flex flex-col bg-white h-full m-0 "
      style={{ transition: "width 0.2s", width: isCollapsed ? "58px" : "370px", minWidth: isCollapsed ? "58px" : "370px" }}
      onTransitionEnd={console.log}
    >
      <div className="relative space-y-1 bg-white flex-grow flex-auto overflow-hidden h-0">
        <nav
          className={classNames("fixed z-40 shadow-2xl h-full", isMouseOver && isCollapsed ? "shadow-custom" : "shadow-2xl")}
          aria-label="Sidebar"
          style={{ transition: "all 0.2s", width: finalWidth }}
        >
          <div className="z-30 bg-gray-100 h-full flex flex-col overflow-hidden">
            <nav
              className="space-y-1 px-2 flex-1 overflow-x-auto whitespace-nowrap"
              aria-label="Sidebar"
              onMouseEnter={() => {
                setIsMouseOver(true);
              }}
              onMouseOver={() => setIsMouseOver(true)}
              onMouseLeave={() => {
                setIsMouseOver(false);
              }}
              data-testid="navigation"
            >
              <RecursiveItems item={navigation} showText={!isCollapsed || isMouseOver} />
            </nav>
          </div>
        </nav>
      </div>
    </div>
  );
}
