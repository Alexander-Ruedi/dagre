import { useState } from "react";

export const usePopupHelper: (initialValue: boolean) => [boolean, () => void, () => void] = (initialValue) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return [isOpen, open, close];
};
