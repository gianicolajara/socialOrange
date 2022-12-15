export interface IconButtonProps {
  children?: React.ReactNode;
  className?: string | undefined;
}

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
}
