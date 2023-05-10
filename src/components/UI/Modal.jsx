import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import BackDrop from "./BackDrop";
import ModalOverlay from "./ModalOverlay";

const Modal = () => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  return domReady ? (
    <>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById("modal-root")
      )}
    </>
  ) : null;
};

export default Modal;
