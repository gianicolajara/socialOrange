import { useState, useEffect } from "react";

interface UseModalProps {
  name: string;
}

const useModal = ({ name = "" }: UseModalProps) => {
  const [modals, setModals] = useState<{
    [name: string]: boolean;
  }>({});

  const toggleModalByName = (nameModal = "") => {
    if (modals.hasOwnProperty(nameModal)) {
      setModals({
        ...modals,
        [nameModal]: !modals[nameModal],
      });
    }
  };

  const openModalByName = (nameModal = "") => {
    if (modals.hasOwnProperty(nameModal)) {
      setModals({
        ...modals,
        [nameModal]: true,
      });
    }
  };

  const closeModalByName = (nameModal = "") => {
    if (modals.hasOwnProperty(nameModal)) {
      setModals({
        ...modals,
        [nameModal]: false,
      });
    }
  };

  useEffect(() => {
    if (!modals.hasOwnProperty(name)) {
      setModals({
        ...modals,
        [name]: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return {
    closeModalByName,
    toggleModalByName,
    openModalByName,
    modals,
  };
};

export default useModal;
