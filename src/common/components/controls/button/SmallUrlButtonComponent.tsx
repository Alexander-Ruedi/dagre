import React from "react";
import { Link } from "react-router-dom";

export interface UrlButtonModel {
  url: string;
  icon: React.ReactNode;
  text: React.ReactNode | string;
}
export const SmallUrlButtonComponent = (props: UrlButtonModel) => {
  return (
    <Link
      className="ml-3 inline-flex justify-center items-center rounded-md border border-gray-200 text-gray-500 px-2.5 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      to={props.url}
    >
      {props.icon}
      {props.text}
    </Link>
  );
};
