import { useState, useEffect, useRef } from "react";
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
  handleOnMouseDownSearchItem = () => {},
  recentListToShow = [],
}: SearchProps) => {
  const [focus, setFocus] = useState(initialFocus);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleOnFocus = () => setFocus(true);
  const handleOnBlur = () => {
    setFocus(initialFocus);
    setValue("");
    setListToShow([]);
  };

  const handleCloseByKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setFocus(initialFocus);
      ref.current?.blur();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleCloseByKey);

    return () => {
      document.removeEventListener("keydown", handleCloseByKey);
    };
  }, []);

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
        ref={ref}
      />
      <ListSearch
        focus={focus}
        listToShow={listToShow}
        handleOnMouseDownSearchItem={handleOnMouseDownSearchItem}
        recentListToShow={recentListToShow}
      />
    </form>
  );
};

export default Search;
