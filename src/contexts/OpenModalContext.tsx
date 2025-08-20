import { createContext, useContext, useState } from "react";

interface OpenModalProviderProps {
  children: React.ReactNode;
}

interface OpenModalContextProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const OpenModalContext = createContext({} as OpenModalContextProps);

export const useOpenModalContext = () => {
  return useContext(OpenModalContext);
}

export const OpenModalProvider = ({ children }: OpenModalProviderProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <OpenModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </OpenModalContext.Provider>
  );
};
