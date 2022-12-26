import Link from "next/link";
import Title from ".";
import { BrandMenuProps } from "./types";

const BrandMenu = ({ children }: BrandMenuProps) => {
  return (
    <Link href="/">
      <Title bold={true} color="text-black" size="text-2xl">
        {children}
      </Title>
    </Link>
  );
};

export default BrandMenu;
