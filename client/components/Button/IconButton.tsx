import { IconButtonProps } from "./types";

const IconButton = ({
  children,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}: IconButtonProps) => {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`p-2 rounded-full flex justify-center items-center text-black bg-neutral-300 hover:bg-neutral-400 transition-all active:bg-neutral-500`}
    >
      {children}
    </button>
  );
};

export default IconButton;
