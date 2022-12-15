import Loader from "../Loader";
import { ButtonProps } from "./types";

const Button = ({
  children,
  onClick = () => {},
  loading = false,
  type = "button",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label="button"
      disabled={loading}
      className={`px-4 py-2 bg-orange-500 text-white rounded-full w-max hover:bg-orange-400 active:bg-orange-700 transition-all self-center ${className}`}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
