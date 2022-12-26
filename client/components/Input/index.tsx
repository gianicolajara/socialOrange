import { forwardRef } from "react";
import { InputProps } from "./types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder = "",
      name = "",
      onChange = undefined,
      value = undefined,
      type = "text",
      className = "",
      error = undefined,
      onBlur = () => {},
      onMouseDown = () => {},
    },
    ref
  ) => {
    return (
      <>
        <input
          ref={ref}
          onBlur={onBlur}
          onMouseDown={onMouseDown}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          className={`p-4 w-full h-[50px] bg-neutral-100 rounded-lg focus:ring-1 focus:ring-neutral-500 focus:bg-white outline-none transition-all font-normal ${className}`}
        />
        {error && <small className="text-red-400"> {error} </small>}
      </>
    );
  }
);

export default Input;
