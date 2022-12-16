import { AiOutlineClose } from "react-icons/ai";
import IconButton from "../Button/IconButton";
import Modal from "../Modal";

interface ModalPostInterface {
  open: boolean;
  onClose: () => void;
}

//TODO
const ModalPost = ({
  open = false,
  onClose = () => {},
}: ModalPostInterface) => {
  return open ? (
    <Modal>
      <div className="w-full min-h-screen h-full fixed top-0 left-0 bg-black/50 z-[9999]">
        <div className="h-full max-h-[400px] w-full max-w-[600px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-3 rounded-lg shadow-lg flex flex-col">
          <div className="flex w-full justify-end">
            <IconButton onClick={onClose}>
              <AiOutlineClose />
            </IconButton>
          </div>
          <div className="w-full h-full overflow-y-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            veniam, natus harum debitis autem, reprehenderit repellendus nisi,
            dolore commodi error eveniet quidem quam alias in consequuntur
            deserunt sit? Omnis, eligendi.
          </div>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default ModalPost;
