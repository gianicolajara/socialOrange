import { useRouter } from "next/router";
import { ItemSearchProps } from "./types";

const ItemSearch = ({
  id = "",
  path = "",
  label = "",
  handleOnMouseDownSearchItem = () => {},
}: ItemSearchProps) => {
  const handleOnMouseDown = () => handleOnMouseDownSearchItem(id, path, label);

  return (
    <li
      className="p-2 hover:bg-neutral-300/70 cursor-pointer"
      onMouseDown={handleOnMouseDown}
    >
      {label}
    </li>
  );
};

export default ItemSearch;
