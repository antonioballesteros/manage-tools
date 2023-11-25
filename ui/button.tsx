import clsx from "clsx";
import { ReactNode } from "react";

export default function Button({
  children,
  className,
  onClick,
  disabled,
}: {
  children: ReactNode;
  className?: string;
  onClick: Function;
  disabled?: boolean;
}) {
  return (
    <button
      className={clsx(
        className,
        "rounded-md bg-black px-4 py-2 text-green-300 enabled:hover:bg-gray-800",
        "disabled:text-red-300"
      )}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
