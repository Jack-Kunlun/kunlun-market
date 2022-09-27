import classNames from "classnames";
import { FC, ReactNode } from "react";

type Size = "large" | "middle" | "small";

type BtnType = "primary" | "dashed" | "link" | "text" | "default";

enum HeightClass {
  large = "lg",
  middle = "md",
  small = "sm",
}

enum BtnTypeClass {
  default = "btn-default",
  primary = "btn-default",
  dashed = "btn-default",
  link = "btn-default",
  text = "btn-text",
}

interface ButtonProps {
  class?: string;
  type?: BtnType;
  size?: Size;
  disabled?: boolean;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  type = "default",
  class: className,
  size = "middle",
  disabled = false,
  children,
}) => {
  const btnClass = BtnTypeClass[type];

  return (
    <button disabled={disabled} className={classNames("btn", btnClass, `h-${HeightClass[size]}`, className)}>
      {children}
    </button>
  );
};

export default Button;
