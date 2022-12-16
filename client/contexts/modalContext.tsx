import { createContext, useState } from "react";

interface ModalProviderProps {
  children: React.ReactNode;
}

interface ModalContextProps {
  handleOpenToggle: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  openModal: boolean;
}

export const ModalContext = createContext<ModalContextProps>({
  handleClose: () => {},
  handleOpen: () => {},
  handleOpenToggle: () => {},
  openModal: false,
});

const initialOpenModal = false;

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [openModal, setOpenModal] = useState(initialOpenModal);

  const handleOpenToggle = () => setOpenModal(!openModal);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(initialOpenModal);

  const value = {
    handleOpenToggle,
    handleOpen,
    handleClose,
    openModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
