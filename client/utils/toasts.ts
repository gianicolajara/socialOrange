import { toast } from "react-toastify";

export const successToast = (msg = "") => {
  toast(msg, {
    type: "success",
    position: "bottom-center",
  });
};

export const errorToast = (msg = "") => {
  toast(msg, {
    type: "error",
    position: "bottom-center",
  });
};
