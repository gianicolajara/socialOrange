import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from ".";
import IconButton from "../Button/IconButton";
import Title from "../Title";

interface NormalModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}

const NormalModal = ({
  children,
  onClose = () => {},
  title = "",
}: NormalModalProps) => {
  const handleEscClose = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  const handleCloseOverlay = () => {
    onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal>
      <div
        className="w-full min-h-screen h-full fixed top-0 left-0 bg-black/50 z-[9999]"
        id="overlay"
        onClick={handleCloseOverlay}
      >
        <div
          className={`h-max max-h-[400px] w-full max-w-[600px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-3 rounded-lg shadow-lg flex flex-col gap-2`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full justify-end">
            <IconButton onClick={onClose}>
              <AiOutlineClose />
            </IconButton>
          </div>
          <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
            <Title size="text-2xl">{title}</Title>
            {children}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NormalModal;
