'use client';
import React, { createContext, useReducer, useContext, JSX } from 'react';

type ModalStatus = 'OPENED' | 'OPENING' | 'CLOSING' | 'CLOSED';

export type ModalComponent = JSX.Element | null;

type Options = {
  wrapperClassName: string;
};

type ModalState = {
  modalStatus: ModalStatus;
  modalComponent: ModalComponent;
  options: Options;
};

type Action = {
  type: ModalStatus;
  payload?: {
    component: ModalComponent;
    options?: Options;
  };
};

type ModalContext = {
  modalState: ModalState;
  openModal: (component: ModalComponent, options?: Options) => void;
  closeModal: () => void;
  openingHandle: () => void;
  closingHandle: () => void;
};

const initialState: ModalState = {
  modalStatus: 'CLOSED',
  modalComponent: null,
  options: {
    wrapperClassName: '',
  },
};

export const ModalContext = createContext<ModalContext>({
  modalState: initialState,
  openModal: () => {},
  closeModal: () => {},
  closingHandle: () => {},
  openingHandle: () => {},
});

ModalContext.displayName = 'ModalContext';

const reducer = (state: ModalState, action: Action): ModalState => {
  switch (action.type) {
    case 'CLOSED':
      return { modalStatus: 'CLOSED', modalComponent: null, options: { wrapperClassName: '' } };
    case 'OPENING':
      return {
        modalStatus: 'OPENING',
        modalComponent: action.payload?.component ?? null,
        options: action.payload?.options ?? { wrapperClassName: '' },
      };

    case 'OPENED':
      return {
        modalStatus: 'OPENED',
        modalComponent: state.modalComponent,
        options: { wrapperClassName: state.options.wrapperClassName },
      };

    case 'CLOSING':
      return {
        modalStatus: 'CLOSING',
        modalComponent: state.modalComponent,
        options: { wrapperClassName: state.options.wrapperClassName },
      };
  }
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, dispatch] = useReducer(reducer, initialState);

  const openModal = (component: ModalComponent, options?: Options) =>
    dispatch({ type: 'OPENING', payload: { component, options } });

  const closeModal = () => dispatch({ type: 'CLOSING' });

  const openingHandle = () => dispatch({ type: 'OPENED' });

  const closingHandle = () => dispatch({ type: 'CLOSED' });

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
