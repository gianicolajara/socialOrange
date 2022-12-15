import Input from "../Input";

const Search = () => {
  return (
    <form className="flex w-full h-[35px] justify-center items-center">
      <Input className="h-[35px]" placeholder="Buscar" type="search" />
    </form>
  );
};

export default Search;
