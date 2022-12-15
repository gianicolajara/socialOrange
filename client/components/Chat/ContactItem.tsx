import Image from "next/image";
import { ContactItemProps } from "./type";

const ContactItem = ({
  id,
  urlAvatar,
  firstname,
  lastname,
}: ContactItemProps) => {
  return (
    <li className="flex gap-2 items-center hover:bg-orange-50 p-2 cursor-pointer">
      <div className="max-w-[30px] max-h-[30px] rounded-full overflow-hidden">
        <Image src={urlAvatar} alt="avatar" width={30} height={30} />
      </div>
      <div>
        <p>
          {firstname} {lastname}
        </p>
      </div>
    </li>
  );
};

export default ContactItem;
