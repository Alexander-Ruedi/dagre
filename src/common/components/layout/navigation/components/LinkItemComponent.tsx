import { Disclosure } from "@headlessui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { classNames } from "../../../../utils/StylingUtil";
import { LinkItemProps } from "../models/LinkItemModel";
import { useNavigate } from "react-router-dom";

export const LinkItemComponent = (props: LinkItemProps) => {
  const { item } = props;
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  return (
    <Disclosure key={props.index}>
      <div className={props.className}>
        <button
          key={item.name}
          onClick={() => {
            navigate(`/${item.href}`);
          }}
          className={classNames(
            item.current && isDisabled ? "text-gray-400" : "",
            !item.current && isDisabled ? "text-gray-400" : "",
            item.current && !isDisabled ? "bg-msg-red text-white" : "",
            !item.current && !isDisabled ? "hover:bg-white hover:text-gray-800" : "",
            "group flex w-full items-center rounded-md py-2 pl-12 pr-2 text-sm font-medium text-left",
          )}
          disabled={isDisabled}
        >
          <span className="flex-1">{item.name}</span>
          {item?.mocked ? <div className="rounded-full bg-gray-500 w-3 h-3">&nbsp;</div> : <></>}
        </button>
      </div>
    </Disclosure>
  );
};
