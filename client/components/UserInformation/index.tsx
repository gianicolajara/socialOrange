import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Title from "../Title";

const UserInformation = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  return (
    <section className="w-full h-max sticky top-[70px] rounded-md p-3">
      <div className="w-full h-max flex flex-col justify-center items-center gap-4 bg-neutral-100 p-5 rounded-md shadow">
        <div className="w-full flex flex-col items-center">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden ">
            <Image
              src={`https://i.pravatar.cc/50?img=${user?.firstName}`}
              alt="avatar"
              width={50}
              height={50}
              className="object-cover"
            />
          </div>
          <Link href={`/profile/${user?.username}`}>
            <Title size="text-xl" color="text-black">
              {user?.firstName} {user?.lastName}
            </Title>
          </Link>
          <small>@{user?.username}</small>
        </div>
      </div>
    </section>
  );
};

export default UserInformation;
