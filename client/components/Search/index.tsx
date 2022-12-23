import { useRouter } from "next/router";
import { useState } from "react";
import Input from "../Input";
import ListSearch from "./ListSearch";
import { SearchProps } from "./types";

const initialFocus = false;

const Search = ({
  onChange = () => {},
  value = "",
  listToShow = [],
  setListToShow = () => {},
  setValue = () => {},
}: SearchProps) => {
  const [focus, setFocus] = useState(initialFocus);
  const router = useRouter();

  const handleOnFocus = () => setFocus(true);
  const handleOnBlur = () => {
    setFocus(initialFocus);
    setValue("");
    setListToShow([]);
  };

  return (
    <form className="flex w-full h-[35px] justify-center items-center relative">
      <Input
        className="h-[35px]"
        placeholder="Buscar"
        type="search"
        onChange={onChange}
        value={value}
        onMouseDown={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <ListSearch focus={focus} listToShow={listToShow} />
    </form>
  );
};

export default Search;
