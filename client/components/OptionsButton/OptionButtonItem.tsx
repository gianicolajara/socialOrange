import { OptionsButtonItemProps } from "./types"

const OptionButtonItem = ({id = 0, label = "", onClick = () => {}}: OptionsButtonItemProps) => {
  return (
    <li  className="text-black p-2 hover:bg-neutral-400" onClick={onClick}>{label}</li>
  )
}

export default OptionButtonItem