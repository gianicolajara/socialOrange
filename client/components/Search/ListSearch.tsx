import { useRouter } from "next/router";
import { ListToShowInterface } from "./types";

interface ListSearchProps {
  listToShow: Array<ListToShowInterface>;
  focus: boolean;
}

const ListSearch = ({ listToShow = [], focus = false }: ListSearchProps) => {
  const router = useRouter();

  return (
    <>
      {listToShow && listToShow.length > 0 && focus && (
        <ul className="absolute top-[50px] w-full bg-neutral-200 rounded-lg overflow-hidden">
          {listToShow.map((item) => (
            <li
              key={item.id}
              className="p-2 hover:bg-neutral-300/70 cursor-pointer"
              onMouseDown={() => router.push(`/profile/${item.path}`)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ListSearch;
