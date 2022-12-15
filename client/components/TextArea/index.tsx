import { TextAreaProps } from "./types";

const TextArea = ({
  placeholder = "",
  name = "",
  onChange = undefined,
  value = undefined,
  error = undefined,
  cols = 40,
}: TextAreaProps) => {
  return (
    <>
      <textarea
        cols={cols}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className="w-full p-3 font-normal resize-none outline-none"
      />
      {error && <small className="text-red-400"> {error} </small>}
    </>
  );
};

export default TextArea;
