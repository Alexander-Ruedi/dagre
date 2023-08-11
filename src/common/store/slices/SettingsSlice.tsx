import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "../../utils/LocalStorageUtil";
import { LocaleFormat, SettingsSliceModel } from "./SettingsSliceModel";

const defaultFormat = LocaleFormat.DE;
const storageFormat = window.localStorage.getItem(LocalStorageKeys.SELECTED_LOCALE_FORMAT) as LocaleFormat;

const initialState: SettingsSliceModel = {
  format: storageFormat || defaultFormat,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setFormat: (state, action: PayloadAction<LocaleFormat>) => {
      state.format = action.payload;
      window.localStorage.setItem(LocalStorageKeys.SELECTED_LOCALE_FORMAT, action.payload);
    },
  },
});

export const { setFormat } = settingsSlice.actions;
export default settingsSlice.reducer;
