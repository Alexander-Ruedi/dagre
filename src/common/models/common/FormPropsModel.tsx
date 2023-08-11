export enum FormModesModel {
  EDIT = "EDIT",
  CREATE = "CREATE",
}

export interface FormControllerProps {
  mode: FormModesModel;
}
