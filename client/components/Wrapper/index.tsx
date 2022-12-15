import { WrapperProps } from "./types";

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div
      aria-label="wrapper"
      className="max-w-[999px] w-full h-full mx-auto px-5"
    >
      {children}
    </div>
  );
};

export default Wrapper;
