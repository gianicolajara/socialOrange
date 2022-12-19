import { MouseEvent } from "react";
import Loader from "../Loader";
import { ButtonProps } from "./types";

const Button = ({
  children,
  onClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {},
  loading = false,
  type = "button",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label="button"
      disabled={loading}
      className={`px-4 py-2 bg-neutral-300 text-black rounded-full w-max hover:bg-neutral-400 active:bg-neutral-500 transition-all self-center  ${className}`}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
