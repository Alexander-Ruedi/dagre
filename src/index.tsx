import { CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { RoutingComponent } from "./common/components/routing/RoutingComponent";
import { store } from "./common/store/Store";

import "ag-grid-enterprise/styles/ag-grid.css";
import "ag-grid-enterprise/styles/ag-theme-balham.css";
import "./common/style/AGGridStyles.css";
import "./common/style/TooltipStyles.css";
import "./index.css";
import "./common/style/ScrollBar.css";
import "./common/style/font.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <CssBaseline>
    <Provider store={store}>
      <RoutingComponent />
    </Provider>
  </CssBaseline>,
);
