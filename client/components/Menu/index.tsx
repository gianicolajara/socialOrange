import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";
import { useAppDispatch } from "../../redux/store";
import { logoutThunk } from "../../redux/thunks/user.thunk";
import Button from "../Button";
import IconButton from "../Button/IconButton";
import Search from "../Search";
import BrandMenu from "../Title/BrandMenu";

const Menu = () => {
  const dispach = useAppDispatch();
  const router = useRouter();

  const handleCloseSession = () => {
    dispach(logoutThunk()).then(() => {
      router.push("/login");
    });
  };

  return (
    <nav className="w-full h-[60px] fixed flex justify-between items-center px-10 border-b-2 border-orange-200 top-0 left-0 bg-white z-[999] ">
      <div className="w-[30%]">
        <BrandMenu>SocialOrange</BrandMenu>
      </div>
      <div className="w-[40%]">
        <Search />
      </div>
      <div className="w-[30%] flex">
        <div className="w-full flex justify-end gap-3">
          <IconButton>
            <AiOutlineUser size={30} />
          </IconButton>
          <Button onClick={handleCloseSession}>Cerrar Session</Button>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
