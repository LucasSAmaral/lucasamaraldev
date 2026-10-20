'use client';

import React, { useContext } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { useModal } from './Modal.context';
import ModalBackdropComponent from './ModalBackdrop.component';
import { breakpoints, colors, radii, transitions } from '@/app/styles/theme';
import { LanguageOptionsContext } from '../language-options/LanguageOptions.context';
import config from '../../../../generated-config.json';

const { locale } = config;

// Id do título do conteúdo aberto no modal (usado pelo aria-labelledby do diálogo).
export const MODAL_TITLE_ID = 'modal-title';

const ModalContainer: React.FC = () => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

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
          <CloseButton
            type="button"
            className="close-modal"
            aria-label={locale[selectedLanguage].modal.close}
            onClick={closeModal}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </CloseButton>
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
  position: relative;
  max-height: calc(100vh - 48px);
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  overscroll-behavior: contain;
  text-align: left;
  background-color: ${colors.surface};
  max-width: 680px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${radii.xl};
  color: ${colors.text};
  width: 100%;
  padding: 36px;
  z-index: 1042;

  @media (max-width: ${breakpoints.columns}px) {
    max-height: calc(100vh - 32px);
    max-height: calc(100dvh - 32px);
    padding: 24px 20px;
    border-radius: ${radii.lg};
  }

  &.sent-message,
  &.sending-message,
  &.error-message {
    width: auto;
    text-align: center;

    .close-modal {
      display: none;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 28px;
  right: 28px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${radii.md};
  background-color: transparent;
  color: ${colors.textSecondary};
  cursor: pointer;
  transition: background-color ${transitions.fast};

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: ${breakpoints.columns}px) {
    top: 16px;
    right: 12px;
  }
`;

export default ModalContainer;
