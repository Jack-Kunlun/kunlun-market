import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useClickAway } from "ahooks";
import classNames from "classnames";
import React, { useState, useRef } from "react";
import DynamicIcon, { allIcons } from "@/components/DynamicIcon";
import type { IconName } from "@/components/DynamicIcon";

interface IconSelectProps {
  width?: number | string;
}

export const IconSelect: React.FC<IconSelectProps> = () => {
  const [value, setValue] = useState<IconName>();
  const [showSelect, setShowSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    if (showSelect) {
      setShowSelect(false);
    }
  }, ref);

  const handleView = () => {
    setShowSelect(true);
  };

  const handleClick = (iconName: IconName) => {
    setValue(iconName);
    setShowSelect(false);
  };

  const onFocus = () => {
    setShowSelect(true);
  };

  return (
    <div ref={ref} className="relative w-full z-10">
      <div
        className={classNames(
          "w-full",
          "b",
          "rd-[6px]",
          "b-grey",
          "border-solid",
          "px-smm",
          "py-[1px]",
          "hover-b-[#4096ff]",
          "flex-center",
          "focus-shadow-[0_0_0_2px_rgba(5,_145,_255,_0.1)]",
          "cursor-text",
          { "shadow-[0_0_0_2px_rgba(5,_145,_255,_0.1)]": showSelect, "!b-[#4096ff]": showSelect }
        )}
      >
        <div className="flex-1 flex-center">
          {value && <DynamicIcon iconName={value} customClass="ml-smm mr-sm" />}
          <input
            className={classNames(
              "b-none",
              "m-0",
              "py-smm",
              "pr-sm",
              "text-base",
              "relative",
              "bg-white",
              "line-height-normal",
              "outline-0",
              "w-full",
              "h-28px"
            )}
            onFocus={onFocus}
          />
        </div>

        {showSelect ? (
          <SearchOutlined className="text-grey text-base mr-smm" />
        ) : (
          <DownOutlined onClick={handleView} className="text-grey text-sm mr-smm" />
        )}
      </div>

      <div
        className={classNames(
          showSelect ? "block" : "hidden",
          "absolute",
          "h-[300px]",
          "overflow-hidden",
          "w-full",
          "bg-white",
          "rd-smm",
          "mt-sm",
          "py-smm",
          "pl-smm",
          "shadow-[0_6px_16px_0_rgba(0,_0,_0,_0.08),_0_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0_9px_28px_8px_rgba(0,_0,_0,_0.05)]"
        )}
      >
        <div
          className={classNames(
            "h-full",
            "w-full",
            "overflow-y-scroll",
            "overflow-x-hidden",
            "flex",
            "flex-wrap",
            "justify-between"
          )}
        >
          {allIcons.map((icon, index) => (
            <div
              key={index}
              onClick={() => handleClick(icon)}
              className="hover-shadow-[0_0_0_2px_rgba(5,_145,_255,_0.1)] cursor-pointer m-smm"
            >
              <DynamicIcon iconName={icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
