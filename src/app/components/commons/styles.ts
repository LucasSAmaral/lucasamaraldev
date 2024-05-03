'use client';
import { MenuStatus } from '../hooks/menu.hook';
import styled, { css, keyframes } from 'styled-components';

const FadeInAnimation = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const FadeOutAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-50px);
    opacity: 0;
  }
`;

const MenuAnimation = (menuStatus: MenuStatus) => {
  switch (menuStatus) {
    case 'OPENING':
      return css`
        animation: ${FadeInAnimation} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      `;
    case 'CLOSING':
      return css`
        animation: ${FadeOutAnimation} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      `;
    case 'OPENED':
      return css`
        display: flex;
      `;
    case 'CLOSED':
      return css`
        display: none;
      `;
  }
};

export const MenuTooltipStyle = (menuStatus: MenuStatus) => {
  return css`
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: #363b3f;
    padding-bottom: 20px;
    border-radius: 4px;
    z-index: 10000;
    border: 1px solid #fffffe;
    ${() => MenuAnimation(menuStatus)}

    &:before {
      content: ' ';
      width: 20px;
      height: 20px;
      background-color: #363b3f;
      position: absolute;
      display: block;
      top: -11px;
      right: calc(50% - 10px);
      transform: rotate(45deg);
      border-top: 1px solid #fffffe;
      border-left: 1px solid #fffffe;
    }
  `;
};

export const Menu = styled.menu.attrs<{ $menuStatus: MenuStatus }>(props => ({
  $menuStatus: props.$menuStatus,
}))`
  gap: 24px;
  padding: 20px;
`;
