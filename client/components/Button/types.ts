export interface IconButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
}
