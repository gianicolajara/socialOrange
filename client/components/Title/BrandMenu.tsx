import Title from ".";
import { BrandMenuProps } from "./types";

const BrandMenu = ({ children }: BrandMenuProps) => {
  return (
    <Title bold={true} color="text-orange-400" size="text-2xl">
      {children}
    </Title>
  );
};

export default BrandMenu;
