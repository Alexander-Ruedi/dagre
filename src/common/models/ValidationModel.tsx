export interface ValidationWarning {
  objectId: string;
  warningMessage?: string;
}

export interface ValidationResponse {
  validationRule: string;
  validationSeverity: ValidationSeverity;
  validationWarnings: ValidationWarning[];
}

export interface ValidationWarningMessage {
  validationRule: string;
  severity: ValidationSeverity;
  warningMessage: string;
}
export enum ValidationSeverity {
  Error = "Error",
  Warning = "Warning",
}

export type ValidationWarningMessageProps = keyof ValidationWarningMessage;
