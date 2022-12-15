import { AiFillCrown } from "react-icons/ai";
import Title from "../../components/Title";

const PresentationLogin = () => {
  return (
    <div className="w-full h-max">
      <div className="flex justify-center lg:justify-end items-center mb-5 gap-2">
        <Title>SocialOrange</Title>
        <AiFillCrown size={30} color="white" />
      </div>
      <p className="text-orange-700 text-center lg:text-right">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus rerum
        consectetur dolorum officiis sunt.
      </p>
    </div>
  );
};

export default PresentationLogin;
