import { ReducersMapObject } from "@reduxjs/toolkit";
import { SettingsSliceModel } from "../slices/SettingsSliceModel";

export interface ReducerModel {
  settings: SettingsSliceModel;
}

export type ReducerMapModel = ReducersMapObject<ReducerModel>;
