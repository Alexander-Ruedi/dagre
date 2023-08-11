import { NavigationLinks } from "../../../table/models/TableModel";
import { NavigationDropdowns } from "../data/NavigationData";

export interface LinkItemChildren {
  mocked?: boolean;
  current: boolean;
  href: NavigationLinks;
  name: string;
  dropdown?: NavigationDropdowns;
  icon?: any;
  children?: Array<LinkItemChildren>;
}

export interface LinkItemProps {
  item: LinkItemChildren;
  children?: Array<LinkItemChildren>;
  index?: string;
  className?: string;
}
