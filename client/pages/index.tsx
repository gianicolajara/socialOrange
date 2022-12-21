import { ReactElement, useEffect } from "react";
import Chat from "../components/Chat";
import CreatePost from "../components/CreatePost";
import GeneralLayout from "../components/Layouts/GeneralLayout";
import ModalsPost from "../components/ModalsPost";
import ModalDeletePost from "../components/ModalsPost/ModalDeletePost";
import Posts from "../components/Posts";
import UserInformation from "../components/UserInformation";
import {
  addModalAction,
  deleteModalAction,
} from "../redux/slices/modal/modal.slice";
import { useAppDispatch } from "../redux/store";
import { modalsEnum } from "../types/enums/generalEnums";

const Home = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <section className="w-full h-full">
        <div className="grid grid-cols-[25%,_50%,_25%] grid-rows-1 w-full relative h-full">
          <div className="w-full h-full">
            <UserInformation />
          </div>
          <div className="w-full h-max pt-[70px]">
            <CreatePost />
            <Posts />
          </div>
          <div className="w-full h-full">
            <Chat />
          </div>
        </div>
      </section>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Home;
