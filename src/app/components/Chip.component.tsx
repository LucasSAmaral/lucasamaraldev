import styled, { css } from 'styled-components';
import { colors, radii } from '@/app/styles/theme';

// Etiquetas de habilidades/interesses (guia de estilo): "filled" para stack, "outline" em destaque.
type ChipVariant = 'filled' | 'outline';

const chipVariantStyle = {
  filled: css`
    background-color: ${colors.surfaceRaised};
    color: #d3d8e0;
  `,
  outline: css`
    border: 1px solid ${colors.accentLine};
    color: ${colors.accent};
  `,
};

export const ChipList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
`;

export const Chip = styled.li<{ $variant?: ChipVariant }>`
  padding: 7px 12px;
  border-radius: ${radii.sm};
  font-size: 14px;
  line-height: 1.3;
  ${({ $variant = 'filled' }) => chipVariantStyle[$variant]}
`;
