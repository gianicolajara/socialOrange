import { AiOutlineClose } from "react-icons/ai";
import Modal from ".";
import { loadingStatePost } from "../../types/enums/generalEnums";
import Button from "../Button";
import IconButton from "../Button/IconButton";
import Title from "../Title";

interface YNModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  title?: string;
  description?: string;
  onYes: () => void;
  onNot?: () => void;
  loading?: string;
}

const YNModal = ({
  children,
  onClose = () => {},
  open = false,
  title = "",
  description = "",
  onYes = () => {},
  onNot = () => {},
  loading = "",
}: YNModalProps) => {
  const handleOnNot = () => {
    onNot();
    onClose();
  };

  const handleOnYes = () => {
    onYes();
  };

  return (
    <>
      {open ? (
        <Modal>
          <div
            className="w-full min-h-screen h-full fixed top-0 left-0 bg-black/50 z-[9999]"
            id="overlay"
            onClick={onClose}
          >
            <div
              className={`h-max max-h-[200px] w-full max-w-[300px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-3 rounded-lg shadow-lg flex flex-col gap-2`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex w-full justify-end">
                <IconButton onClick={handleOnNot}>
                  <AiOutlineClose />
                </IconButton>
              </div>
              <div className="w-full h-full overflow-y-auto flex flex-col gap-1">
                <Title size="text-2xl">{title}</Title>
                <p>{description}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleOnYes}
                    loading={loading === loadingStatePost.PENDING}
                  >
                    Si
                  </Button>
                  <Button onClick={handleOnNot}>No</Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default YNModal;
