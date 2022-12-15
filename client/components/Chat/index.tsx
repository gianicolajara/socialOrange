import ListContact from "./ListContact";
import { User } from "./type";

const listOfUsers: Array<User> = [
  {
    id: 1,
    username: "Juanito",
    firstname: "Juan",
    lastname: "Jara",
    urlAvatar: "https://i.pravatar.cc/30?img=62",
  },
  {
    id: 2,
    username: "Maria",
    firstname: "Maria",
    lastname: "Jara",
    urlAvatar: "https://i.pravatar.cc/30?img=61",
  },
  {
    id: 3,
    username: "Alberto",
    firstname: "Alberto",
    lastname: "Jara",
    urlAvatar: "https://i.pravatar.cc/30?img=60",
  },
  {
    id: 4,
    username: "Karina",
    firstname: "Karina",
    lastname: "Jara",
    urlAvatar: "https://i.pravatar.cc/30?img=59",
  },
];

const Chat = () => {
  return (
    <div className="h-[calc(100vh-70px)] sticky w-full top-[70px]">
      <div className="w-full h-max overflow-y-auto sticky top-[70px]">
        <h3 className="mb-3">Contactos</h3>
        <ListContact listOfUsers={listOfUsers} />
      </div>
    </div>
  );
};

export default Chat;
