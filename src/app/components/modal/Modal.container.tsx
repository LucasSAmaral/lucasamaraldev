'use client';

import React, { useContext, useEffect, useRef } from 'react';
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

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const getFocusableElements = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    element => element.offsetParent !== null,
  );

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

  const contentRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const isOpen = modalStatus !== 'CLOSED';

  // Ao abrir: guarda o elemento focado, move o foco para o diálogo e trava a rolagem da página.
  // Ao fechar: devolve o foco para quem abriu o modal.
  useEffect(() => {
    if (!isOpen) {
      previouslyFocusedRef.current?.focus();
      previouslyFocusedRef.current = null;
      return;
    }

    if (!previouslyFocusedRef.current) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    }
    contentRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (modalStatus !== 'OPENED' && modalStatus !== 'OPENING') {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [modalStatus, closeModal]);

  // Mantém o Tab circulando entre os elementos focáveis do modal.
  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !contentRef.current) {
      return;
    }

    const focusableElements = getFocusableElements(contentRef.current);

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === contentRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) {
    return null;
  }

  const isOpened = modalStatus === 'OPENED';

  return ReactDom.createPortal(
    <ModalBackdropComponent
      onAnimationEnd={modalStatus === 'CLOSING' ? closingHandle : () => {}}
      onClick={isOpened ? closeModal : () => {}}
      className={
        modalStatus === 'OPENING' ? '--opening' : modalStatus === 'CLOSING' ? '--closing' : ''
      }
    >
      <ModalContent
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={MODAL_TITLE_ID}
        tabIndex={-1}
        onKeyDown={trapFocus}
        onAnimationEnd={modalStatus === 'OPENING' ? openingHandle : undefined}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className={`modal-content ${wrapperClassName}`}
      >
        <CloseButton
          type="button"
          className="close-modal"
          aria-label={locale[selectedLanguage].modal.close}
          onClick={isOpened ? closeModal : () => {}}
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
        {modalComponent}
      </ModalContent>
    </ModalBackdropComponent>,
    document.getElementById('modal') as Element,
  );
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

  &:focus {
    outline: none;
  }

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
