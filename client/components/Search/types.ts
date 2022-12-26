export interface ListToShowInterface {
  id: string;
  label: string;
  path: string;
}

export interface SearchProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  listToShow?: Array<ListToShowInterface>;
  setListToShow?: React.Dispatch<
    React.SetStateAction<Array<ListToShowInterface>>
  >;
  handleOnMouseDownSearchItem?: (
    id: string,
    path: string,
    label: string
  ) => void;
  recentListToShow?: Array<ListToShowInterface>;
}

export interface ItemSearchProps {
  id: string;
  path: string;
  label: string;
  handleOnMouseDownSearchItem?: (
    id: string,
    path: string,
    label: string
  ) => void;
}

export interface ListSearchProps {
  listToShow: Array<ListToShowInterface>;
  focus: boolean;
  handleOnMouseDownSearchItem?: (
    id: string,
    path: string,
    label: string
  ) => void;
  recentListToShow?: Array<ListToShowInterface>;
}
