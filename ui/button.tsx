import clsx from "clsx";
import { ReactNode } from "react";

export default function Button({
  children,
  className,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  className?: string;
  onClick?: Function;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}) {
  return (
    <button
      className={clsx(
        className,
        "rounded-md bg-black px-4 py-2 text-green-300 enabled:hover:bg-gray-800",
        "disabled:text-red-300"
      )}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
