import { useState } from "react";
import { SlOptions } from "react-icons/sl";
import IconButton from "../Button/IconButton";
import ListButtonItem from "./ListButtonItem";
import { OptionsButtonProps } from "./types";

const initialOptionOpen = false;

const OptionsButton = ({ options }: OptionsButtonProps) => {
  const [optionOpen, setOptionOpen] = useState<boolean>(initialOptionOpen);

  const handleOptionToggle = () => setOptionOpen(!optionOpen);
  const handleOptionClose = () => setOptionOpen(initialOptionOpen);

  return (
    <>
      {optionOpen && (
        <div
          className="w-full h-full absolute top-0 left-0 z-50"
          onClick={handleOptionClose}
        ></div>
      )}
      <div className="relative">
        <IconButton onClick={handleOptionToggle}>
          <SlOptions />
          {optionOpen && (
            <div className="min-w-[200px] w-max h-max bg-neutral-400/80 absolute top-[50px] left-0 rounded-lg overflow-hidden transition-all z-[99]">
              <ListButtonItem options={options} />
            </div>
          )}
        </IconButton>
      </div>
    </>
  );
};

export default OptionsButton;
