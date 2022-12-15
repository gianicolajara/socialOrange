import Menu from "../Menu";
import { GeneralLayoutProps } from "./types";

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};

export default GeneralLayout;
