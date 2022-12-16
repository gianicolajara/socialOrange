import { ButtonOptionsInterface } from "../../types/interfaces/buttonOptions";

export interface OptionsButtonProps {
    options: Array<ButtonOptionsInterface>
}

export interface ListButtonItemProps{
    options: Array<ButtonOptionsInterface>
}

export interface OptionsButtonItemProps {
    id: number;
    label: string;
    onClick: () => void
}