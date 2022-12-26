import Loader from "../Loader";
import { IconButtonProps } from "./types";

const IconButton = ({
  children,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  loading = false,
}: IconButtonProps) => {
  return (
    <button
      disabled={loading}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`p-2 rounded-full flex justify-center items-center text-black bg-neutral-300 hover:bg-neutral-400 transition-all active:bg-neutral-500`}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default IconButton;
