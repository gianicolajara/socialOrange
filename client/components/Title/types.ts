export interface BrandMenuProps {
  children: React.ReactNode;
}

export interface TitleProps {
  children?: React.ReactNode;
  bold?: boolean;
  size?: "text-xl" | "text-2xl" | "text-4xl";
  color?: "text-orange-900" | "text-black" | "text-white" | "text-orange-400";
}
