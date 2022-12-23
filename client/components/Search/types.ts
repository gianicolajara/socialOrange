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
}
