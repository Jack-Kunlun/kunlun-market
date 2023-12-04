import * as AntdIcons from "@ant-design/icons";
import classNames from "classnames";
import { FC } from "react";

export type IconName = keyof typeof AntdIcons;

export const allIcons = Object.keys(AntdIcons).filter(
  (item) =>
    typeof AntdIcons[item as IconName] === "object" &&
    (item.includes("Outlined") || item.includes("Filled") || item.includes("TwoTone"))
) as IconName[];

interface DynamicIconProps {
  iconName: IconName;
  customClass?: string;
}

const DynamicIcon: FC<DynamicIconProps> = ({ iconName, customClass }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = AntdIcons[iconName] as React.ComponentType<any>;

  return <IconComponent className={classNames("text-md", customClass)} />;
};

export default DynamicIcon;
