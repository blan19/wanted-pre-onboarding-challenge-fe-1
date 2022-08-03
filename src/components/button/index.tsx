import React, { FunctionComponent } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | undefined;
  event?: () => void;
} & {
  children: React.ReactNode;
};

const Button: FunctionComponent<ButtonProps> = React.memo(function Button({
  type = undefined,
  disabled = undefined,
  event,
  children,
}) {
  return (
    <button
      className="disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed bg-black text-white font-bold py-2 px-3 rounded-lg"
      type={type}
      disabled={disabled}
      onClick={event}
    >
      {children}
    </button>
  );
});

export default Button;
