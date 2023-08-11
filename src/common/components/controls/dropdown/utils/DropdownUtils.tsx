import { DropdownModel } from "../models/DropdownModel";

export const getSelectedDropdownItem = (items: Array<DropdownModel>, id?: string | null, placeholder?: string) => {
  if (id !== "" && items.length > 0) {
    const currentItem = items.filter((item) => item.id === id);
    if (currentItem.length > 0) {
      return currentItem[0];
    }
  }
  return { id: "", label: placeholder || "Please select" };
};
