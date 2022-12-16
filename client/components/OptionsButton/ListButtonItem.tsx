import OptionButtonItem from "./OptionButtonItem";
import { ListButtonItemProps } from "./types";

const ListButtonItem = ({ options = [] }: ListButtonItemProps) => {
  return (
    <ul className="list-none">
      {options.map(({ id, label, onClick }) => (
        <OptionButtonItem key={id} id={id} label={label} onClick={onClick} />
      ))}
    </ul>
  );
};

export default ListButtonItem;
