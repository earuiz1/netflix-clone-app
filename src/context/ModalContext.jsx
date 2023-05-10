import { createContext, useState } from "react";

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});

  return (
    <ModalContext.Provider
      value={{
        movieInfo,
        setMovieInfo,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
