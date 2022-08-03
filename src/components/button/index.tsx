import React, { FunctionComponent } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | undefined;
  primary?: boolean;
  event?: () => void;
} & {
  children: React.ReactNode;
};

const Button: FunctionComponent<ButtonProps> = React.memo(function Button({
  type = undefined,
  disabled = undefined,
  primary = true,
  event,
  children,
}) {
  return (
    <button
      className={`disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed ${
        primary ? "bg-black" : "bg-red-500"
      } bg-black text-white font-bold py-2 px-5 rounded-lg`}
      type={type}
      disabled={disabled}
      onClick={event}
    >
      {children}
    </button>
  );
});

export default Button;
