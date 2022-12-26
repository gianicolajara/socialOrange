import ItemSearch from "./ItemSearch";
import { ListSearchProps } from "./types";

const ListSearch = ({
  listToShow = [],
  focus = false,
  handleOnMouseDownSearchItem = () => {},
  recentListToShow = [],
}: ListSearchProps) => {
  return (
    <>
      {focus && (
        <ul className="absolute top-[50px] w-full bg-neutral-200 rounded-lg overflow-hidden p-2">
          {listToShow &&
            listToShow.length > 0 &&
            listToShow.map(({ id, label, path }) => (
              <ItemSearch
                id={id}
                label={label}
                path={path}
                key={id}
                handleOnMouseDownSearchItem={handleOnMouseDownSearchItem}
              />
            ))}
          {recentListToShow && recentListToShow.length > 0 && (
            <div className="w-full">
              <small className="font-bold">Recent searches</small>
              {recentListToShow.map(({ id, label, path }) => (
                <ItemSearch
                  id={id}
                  label={label}
                  path={path}
                  key={id}
                  handleOnMouseDownSearchItem={handleOnMouseDownSearchItem}
                />
              ))}
            </div>
          )}
        </ul>
      )}
    </>
  );
};

export default ListSearch;
