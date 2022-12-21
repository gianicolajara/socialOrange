import Image from "next/image";
import { PostInterface } from "../../types/interfaces/post";
import { dateToHumanTime } from "../../utils/times";
import Title from "../Title";

interface ProfileUserProps {
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  posts?: Array<PostInterface>;
}

const ProfileUser = ({
  username = "",
  firstName = "",
  lastName = "",
  createdAt = "",
}: ProfileUserProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-3 bg-neutral-100 rounded-lg border border-neutral-300">
      <div className="w-[75px] h-[75px] rounded-full overflow-hidden">
        <Image
          src={`https://i.pravatar.cc/50?img=${username}`}
          alt="avatar"
          width={75}
          height={75}
          className="object-cover"
        />
      </div>
      <Title>
        {firstName} {lastName}
      </Title>
      <p>@{username}</p>
      <p>Creado el {dateToHumanTime({ date: new Date(createdAt) })}</p>
    </div>
  );
};

export default ProfileUser;
