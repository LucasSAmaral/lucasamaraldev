"use client";

import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { useModal } from "./Modal.context";
import ModalBackdropComponent from "./ModalBackdrop.component";

const ModalContainer: React.FC = () => {
  const {
    closeModal,
    closingHandle,
    modalState: { modalComponent, modalStatus },
    openingHandle,
  } = useModal();

  const classRelation = {
    OPENED: "--opened",
    OPENING: "--opening",
    CLOSED: "--closed",
    CLOSING: "--closing",
  };

  const Modal = ({
    children,
    closeModal = () => {},
    classRelation,
    onBackdropAnimationEnd = () => {},
    onModalAnimationEnd,
  }: {
    children: React.ReactNode;
    closeModal?: () => void;
    classRelation?: string;
    onBackdropAnimationEnd?: () => void;
    onModalAnimationEnd?: () => void;
  }) => {
    return ReactDom.createPortal(
      <ModalBackdropComponent
        onAnimationEnd={onBackdropAnimationEnd}
        onClick={closeModal}
        className={classRelation ? classRelation : ""}
      >
        <ModalContent
          onAnimationEnd={onModalAnimationEnd}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className="modal-content"
        >
          <div className="close-modal" onClick={closeModal}>
            X
          </div>
          {children}
        </ModalContent>
      </ModalBackdropComponent>,
      document.getElementById("modal") as Element
    );
  };

  switch (modalStatus) {
    case "OPENED":
      return <Modal closeModal={closeModal}>{modalComponent}</Modal>;

    case "OPENING":
      return (
        <Modal
          classRelation={classRelation[modalStatus]}
          onModalAnimationEnd={openingHandle}
        >
          {modalComponent}
        </Modal>
      );
    case "CLOSING":
      return (
        <Modal
          classRelation={classRelation[modalStatus]}
          onBackdropAnimationEnd={closingHandle}
        >
          {modalComponent}
        </Modal>
      );

    case "CLOSED":
      return null;
  }
};

const ModalContent = styled.div`
  position: fixed;
  background-color: #0f0f0f;
  border: 2px ridge #ffffff;
  max-width: 1000px;
  color: whitesmoke;
  width: 100%;
  padding: 20px 10px;
  z-index: 1042;

  .close-modal {
    display: inline-block;
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 15px;
    font-weight: bold;
  }
`;

export default ModalContainer;
