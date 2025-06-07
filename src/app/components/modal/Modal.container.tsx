'use client';

import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { useModal } from './Modal.context';
import ModalBackdropComponent from './ModalBackdrop.component';

const ModalContainer: React.FC = () => {
  const {
    closeModal,
    closingHandle,
    modalState: {
      modalComponent,
      modalStatus,
      options: { wrapperClassName },
    },
    openingHandle,
  } = useModal();

  const classRelation = {
    OPENED: '--opened',
    OPENING: '--opening',
    CLOSED: '--closed',
    CLOSING: '--closing',
  };

  const Modal = ({
    children,
    closeModal = () => {},
    classRelation = '',
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
        className={classRelation}
      >
        <ModalContent
          onAnimationEnd={onModalAnimationEnd}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className={`modal-content ${wrapperClassName}`}
        >
          <div className="close-modal" onClick={closeModal}>
            X
          </div>
          {children}
        </ModalContent>
      </ModalBackdropComponent>,
      document.getElementById('modal') as Element,
    );
  };

  switch (modalStatus) {
    case 'OPENED':
      return <Modal closeModal={closeModal}>{modalComponent}</Modal>;

    case 'OPENING':
      return (
        <Modal classRelation={classRelation[modalStatus]} onModalAnimationEnd={openingHandle}>
          {modalComponent}
        </Modal>
      );
    case 'CLOSING':
      return (
        <Modal classRelation={classRelation[modalStatus]} onBackdropAnimationEnd={closingHandle}>
          {modalComponent}
        </Modal>
      );

    case 'CLOSED':
      return null;
  }
};

const ModalContent = styled.div`
  position: fixed;
  background-color: #363b3f;
  max-width: 800px;
  border-radius: 5px;
  color: #f0f5f9;
  width: 100%;
  padding: 20px 10px;
  z-index: 1042;

  &.sent-message,
  &.sending-message,
  &.error-message {
    width: auto;
    text-align: center;

    .close-modal {
      display: none;
    }
  }

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
