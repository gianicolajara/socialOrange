import { MouseEvent, useRef } from "react";
import Button from "../Button";

interface InputFileProps {
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const InputFile = ({ handleChangeFile, value }: InputFileProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleClickRef = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => ref.current && ref.current.click();

  return (
    <>
      <input
        type="file"
        onChange={handleChangeFile}
        className="hidden"
        ref={ref}
        value={value}
      />
      <Button onClick={handleClickRef}>Archivo</Button>
    </>
  );
};

export default InputFile;
