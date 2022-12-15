import React from "react";
import ContactItem from "./ContactItem";
import { ListContactProps } from "./type";

const ListContact = ({ listOfUsers }: ListContactProps) => {
  return (
    <ul className="flex flex-col">
      {listOfUsers.map(({ firstname, id, lastname, urlAvatar, username }) => (
        <ContactItem
          key={id}
          id={id}
          firstname={firstname}
          lastname={lastname}
          urlAvatar={urlAvatar}
        />
      ))}
    </ul>
  );
};

export default ListContact;
