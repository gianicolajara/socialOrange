import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import GeneralLayout from "../../components/Layouts/GeneralLayout";
import Loader from "../../components/Loader";
import ListPost from "../../components/Posts/ListPost";
import ProfileUser from "../../components/ProfileUser";
import Title from "../../components/Title";
import Wrapper from "../../components/Wrapper";
import { RootState, useAppDispatch } from "../../redux/store";
import { getProfileByNameThunk } from "../../redux/thunks/profile.thunk";
import { loadingStateProfile } from "../../types/enums/generalEnums";

const Profile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, user } = useSelector(
    (state: RootState) => state.profileReducer
  );

  useEffect(() => {
    dispatch(getProfileByNameThunk(router.query.name as string));
  }, []);

  if (loading === loadingStateProfile.PENDING)
    return (
      <div className="w-full h-full">
        <Loader color="black" />
      </div>
    );

  return (
    <div className="mt-[70px] w-full">
      <Wrapper>
        {user ? (
          <ProfileUser
            createdAt={user.createdAt || ""}
            firstName={user.firstName}
            lastName={user.lastName}
            username={user.username}
            posts={user.posts || []}
          />
        ) : (
          <div className="w-full flex justify-center items-center">
            <Title>Usuario no encontrado</Title>
          </div>
        )}

        <div className="flex flex-col items-center gap-3 my-5">
          <ListPost posts={user?.posts || []} />
        </div>
      </Wrapper>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Profile;
