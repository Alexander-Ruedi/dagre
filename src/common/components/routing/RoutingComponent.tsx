import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { AppLayoutComponent } from "../layout/AppLayoutComponent";
import PageNotFound from "../layout/page/404Page";
import ErrorPage from "../layout/page/ErrorPage";
import React from "react";
import { DagreD3Component } from "../../../dagre-d3/DagreD3Component";
import { DagreAntvComponent } from "../../../dagre-antv/DagreAntvComponent";
import { SprottyComponent } from "../../../elk-sprotty/SprottyComponent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AppLayoutComponent />}>
        <Route errorElement={<ErrorPage />}>
          <Route path="/" element={<Navigate to="/dagre-d3" />} />
          <Route path="/dagre-d3" element={<DagreD3Component />} />
          <Route path="/sprotty" element={<SprottyComponent />} />
          <Route path="/dagre-antv" element={<DagreAntvComponent />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>,
  ),
  {
    basename: process.env.PUBLIC_URL,
  },
);

export const RoutingComponent = () => {
  return <RouterProvider router={router} />;
};
