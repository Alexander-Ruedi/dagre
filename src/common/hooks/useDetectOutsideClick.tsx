import { useEffect } from "react";
import { Observable } from "rxjs";

export const useDetectOutsideClick: (ref: any) => Observable<any> = (ref) =>
  new Observable((subscriber) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          subscriber.next(event.target);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [subscriber]);
  });
