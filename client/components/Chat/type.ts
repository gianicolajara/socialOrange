export interface ContactItemProps {
  id: number;
  urlAvatar: string;
  firstname: string;
  lastname: string;
}

export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  urlAvatar: string;
}

export interface ListContactProps {
  listOfUsers: Array<User>;
}
