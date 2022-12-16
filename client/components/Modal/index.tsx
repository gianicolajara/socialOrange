import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import IconButton from "../Button/IconButton";

interface ModalProps {
  children: React.ReactNode;
}

const initialMount = false;

const Modal = ({ children }: ModalProps) => {
  const ref = useRef<Element>();
  const [mount, setMount] = useState<boolean>(initialMount);

  useEffect(() => {
    ref.current = document.getElementById("modal") as Element;
    setMount(true);
    return () => {
      setMount(false);
    };
  }, []);

  return mount && ref.current ? createPortal(children, ref.current) : null;
};

export default Modal;
