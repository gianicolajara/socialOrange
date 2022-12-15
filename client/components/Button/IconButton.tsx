import { IconButtonProps } from "./types";

const IconButton = ({ children }: IconButtonProps) => {
  return (
    <button
      className={`w-[40px] h-[40px] rounded-full flex justify-center items-center px-2 py-2  text-orange-400 border-2 border-orange-400 bg-white`}
    >
      {children}
    </button>
  );
};

export default IconButton;
