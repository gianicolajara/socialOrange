import { ChangeEvent } from "react";

export interface TextAreaProps {
  placeholder?: string;
  name?: string;
  value?: string | undefined;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void | undefined;
  className?: string | undefined;
  error?: string | undefined;
  cols?: number | undefined;
}
