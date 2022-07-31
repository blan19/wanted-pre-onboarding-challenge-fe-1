import React, { FunctionComponent } from "react";
import style from "./style.css";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | undefined;
} & {
  children: React.ReactNode;
};

const Button: FunctionComponent<ButtonProps> = ({
  type = undefined,
  disabled = undefined,
  children,
}) => {
  return (
    <button type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
