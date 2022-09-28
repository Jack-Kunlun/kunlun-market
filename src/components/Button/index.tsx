import classNames from "classnames";
import { FC, ReactNode } from "react";

type Size = "lg" | "md" | "sm";

type BtnType = "primary" | "dashed" | "link" | "text" | "default";

type Shape = "default" | "circle" | "round";

interface ButtonProps {
  class?: string;
  type?: BtnType;
  size?: Size;
  shape?: Shape;
  disabled?: boolean;
  children?: ReactNode;
}

const getBorderRadius = (shape: Shape, size: Size) => {
  let borderRadius = "";

  switch (shape) {
    case "default":
      borderRadius = "rounded-smm";
      break;
    case "circle":
      borderRadius = "rounded-50";
      break;
    case "round":
      borderRadius = `rounded-${size}`;
      break;
  }

  return borderRadius;
};

const Button: FC<ButtonProps> = ({
  type = "default",
  shape = "default",
  class: className,
  size = "md",
  disabled = false,
  children,
}) => {
  const borderRadius = getBorderRadius(shape, size);

  return (
    <button disabled={disabled} className={classNames("btn", `btn-${type}`, `h-${size}`, borderRadius, className)}>
      {children}
    </button>
  );
};

export default Button;
