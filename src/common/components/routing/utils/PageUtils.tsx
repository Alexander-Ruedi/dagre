import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router/dist/lib/hooks";
import { setIsDirty } from "../../../store/slices/FormSlice";
import { removeSelected, setModified } from "../../../store/util/DispatcherUtil";
import { cleanCacheCascading } from "../../../utils/CacheUtil";
import { NavigationLinks } from "../../table/models/TableModel";

export const updateStore = (table: NavigationLinks, dispatch: Dispatch, navigate: NavigateFunction, modifiedItem: any, navigateTo: string) => {
  setModified(table, [modifiedItem], dispatch);
  removeSelected(table, dispatch);
  cleanCacheCascading(table);
  forceNavigate(navigate, dispatch, navigateTo);
};

export const updateStoreArray = (
  table: NavigationLinks,
  dispatch: Dispatch,
  navigate: NavigateFunction,
  modifiedItem: Array<any>,
  navigateTo: string,
) => {
  setModified(table, modifiedItem, dispatch);
  removeSelected(table, dispatch);
  cleanCacheCascading(table);
  forceNavigate(navigate, dispatch, navigateTo);
};

export const forceNavigate = (navigate: NavigateFunction, dispatch: Dispatch, navigateTo: string) => {
  dispatch(setIsDirty(false));
  navigate(navigateTo);
};
