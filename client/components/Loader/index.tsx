import { BiLoaderAlt } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center animate-spin">
      <BiLoaderAlt size={20} className="text-white" />
    </div>
  );
};

export default Loader;
