import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { logoutThunk } from "../../redux/thunks/user.thunk";
import Button from "../Button";
import IconButton from "../Button/IconButton";
import Search from "../Search";
import BrandMenu from "../Title/BrandMenu";
import { loadingStateUser } from "../../types/enums/generalEnums";
import { resetPosts } from "../../redux/slices/post/post.slice";
import { getListOfUserByNameService } from "../../services/user/user.services";
import { AxiosResponseGetListOfUsersByName } from "../../types/interfaces/user";
import { ListToShowInterface } from "../Search/types";
import { getItemLS, setItemLS } from "../../utils/localStorage";

const initialUsersList: Array<ListToShowInterface> = [];
const initialRecentUserSearch: Array<ListToShowInterface> = [];

const Menu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [usersList, setUsersList] =
    useState<Array<ListToShowInterface>>(initialUsersList);
  const [recentUserSearch, setRecentUserSearch] =
    useState<Array<ListToShowInterface>>();

  const { loading } = useSelector((state: RootState) => state.userReducer);

  const handleCloseSession = () => {
    dispatch(logoutThunk());
  };

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    getListOfUserByNameService(e.target.value).then((res) => {
      setUsersList(
        (res.data as AxiosResponseGetListOfUsersByName).users.map((item) => {
          return {
            id: item.id as string,
            label: `${item.firstName} ${item.lastName}`,
            path: item.username,
          };
        })
      );
    });
  };

  const handleOnMouseDownSearchItem = (id = "", path = "", label = "") => {
    let recentProfilesLS: Array<ListToShowInterface> =
      getItemLS("recent-profiles") || [];
    let itemAlreadyExits: boolean = recentProfilesLS.some(
      (item) => item.id === id
    );

    if (!itemAlreadyExits) {
      recentProfilesLS =
        recentProfilesLS.length >= 5
          ? recentProfilesLS.slice(-1)
          : recentProfilesLS;

      setItemLS("recent-profiles", [...recentProfilesLS, { id, path, label }]);
    }

    router.push(`/profile/${path}`);
  };

  useEffect(() => {
    if (loading === loadingStateUser.SUCCEEDEDLOGOUT) {
      dispatch(resetPosts());
      router.push("/login");
    }
  }, [dispatch, loading, router]);

  useEffect(() => {
    setRecentUserSearch(getItemLS("recent-profiles") || []);
  }, []);

  return (
    <nav className="w-full h-[60px] fixed flex justify-between items-center px-10 border-b-[1px] border-neutral-300 top-0 left-0 bg-white z-[999] ">
      <div className="w-[30%]">
        <BrandMenu>SocialOrange</BrandMenu>
      </div>
      <div className="w-[40%]">
        <Search
          onChange={handleOnChangeSearch}
          value={searchText}
          listToShow={usersList}
          setListToShow={setUsersList}
          setValue={setSearchText}
          handleOnMouseDownSearchItem={handleOnMouseDownSearchItem}
          recentListToShow={recentUserSearch}
        />
      </div>
      <div className="w-[30%] flex">
        <div className="w-full flex justify-end items-center gap-3">
          <IconButton>
            <AiOutlineUser size={20} />
          </IconButton>
          <Button onClick={handleCloseSession}>Cerrar Session</Button>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
