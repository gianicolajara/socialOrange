import { ChangeEvent } from "react";

export interface InputProps {
  placeholder?: string;
  name?: string;
  value?: string | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
  className?: string | undefined;
  error?: string | undefined;
}
