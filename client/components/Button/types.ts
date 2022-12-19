import { MouseEvent } from "react";

export interface IconButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
}
