import { MergeModes } from "../components/ImportModeSelect";
import { WithId } from "./WithId";

export interface Merge<T> {
  current: WithId<T> | null;
  imported: T | null;
  operation: MergeModes;
  info: string[];
  warning: string[];
  error: string[];
}
