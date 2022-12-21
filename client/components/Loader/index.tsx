import { BiLoaderAlt } from "react-icons/bi";

interface LoaderProps {
  color?: "white" | "black";
}

const Loader = ({ color = "white" }: LoaderProps) => {
  const colorOptions = {
    black: "text-black",
    white: "text-white",
  };

  return (
    <div className="w-full h-full flex justify-center items-center animate-spin">
      <BiLoaderAlt size={20} className={`${colorOptions[color]}`} />
    </div>
  );
};

export default Loader;
