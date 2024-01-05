"use client";
import React, { createContext, useReducer, useContext } from "react";

type ModalStatus = "OPENED" | "OPENING" | "CLOSING" | "CLOSED";

type ModalComponent = JSX.Element | null;

type ModalState = {
  modalStatus: ModalStatus;
  modalComponent: ModalComponent;
};

type Action = {
  type: ModalStatus;
  payload?: { component: ModalComponent };
};

type ModalContext = {
  modalState: ModalState;
  openModal: (component: ModalComponent) => void;
  closeModal: () => void;
  openingHandle: () => void;
  closingHandle: () => void;
};

const initialState: ModalState = {
  modalStatus: "CLOSED",
  modalComponent: null,
};

export const ModalContext = createContext<ModalContext>({
  modalState: initialState,
  openModal: () => {},
  closeModal: () => {},
  closingHandle: () => {},
  openingHandle: () => {},
});

ModalContext.displayName = "ModalContext";

const reducer = (state: ModalState, action: Action): ModalState => {
  switch (action.type) {
    case "CLOSED":
      return { modalStatus: "CLOSED", modalComponent: null };
    case "OPENING":
      return {
        modalStatus: "OPENING",
        modalComponent: action.payload?.component ?? null,
      };

    case "OPENED":
      return { modalStatus: "OPENED", modalComponent: state.modalComponent };

    case "CLOSING":
      return { modalStatus: "CLOSING", modalComponent: state.modalComponent };
  }
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, dispatch] = useReducer(reducer, initialState);

  const openModal = (component: ModalComponent) =>
    dispatch({ type: "OPENING", payload: { component } });

  const closeModal = () => dispatch({ type: "CLOSING" });

  const openingHandle = () => dispatch({ type: "OPENED" });

  const closingHandle = () => dispatch({ type: "CLOSED" });

  return (
    <ModalContext.Provider
      value={{
        modalState,
        closeModal,
        closingHandle,
        openingHandle,
        openModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { openModal, closeModal, closingHandle, modalState, openingHandle } =
    useContext(ModalContext);
  return { openModal, closeModal, closingHandle, modalState, openingHandle };
};
