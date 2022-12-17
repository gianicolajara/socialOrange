import { TitleProps } from "./types";

const Title = ({
  children,
  bold = true,
  size = "text-4xl",
  color = "text-black",
}: TitleProps) => {
  return (
    <h1 className={`${bold ? "font-bold" : ""} ${size} ${color}`}>
      {children}
    </h1>
  );
};

export default Title;
