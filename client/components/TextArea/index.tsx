import { TextAreaProps } from "./types";

const TextArea = ({
  placeholder = "",
  name = "",
  onChange = undefined,
  value = undefined,
  error = undefined,
  rows = 40,
  withBorder = false,
}: TextAreaProps) => {
  return (
    <>
      <textarea
        rows={rows}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className={`w-full p-3 font-normal resize-none outline-none rounded-lg ${
          withBorder ? "border-[1px] border-neutral-400" : "border-0"
        }`}
      />
      {error && <small className="text-red-400"> {error} </small>}
    </>
  );
};

export default TextArea;
