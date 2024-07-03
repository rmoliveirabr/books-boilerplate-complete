import { toast, Id } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // TODO: check this

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning'): Id => {
  return toast(message, {
    type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const dismissToast = (toastId: Id) => {
  toast.dismiss(toastId);
};
