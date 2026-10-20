import Link from 'next/link';
import styled, { css } from 'styled-components';
import { breakpoints, colors, radii, transitions } from '@/app/styles/theme';

// Link com cara de botão (guia de estilo: primário, secundário e terciário).
type ActionVariant = 'primary' | 'secondary' | 'tertiary';

const actionVariantStyle = {
  primary: css`
    background-color: ${colors.accent};
    color: ${colors.onAccent};

    &:hover {
      filter: brightness(1.08);
    }
  `,
  secondary: css`
    border: 1px solid ${colors.borderStrong};
    color: ${colors.text};

    &:hover {
      background-color: rgba(255, 255, 255, 0.06);
    }
  `,
  tertiary: css`
    padding: 0 18px;
    color: ${colors.textSecondary};

    &:hover {
      background-color: rgba(255, 255, 255, 0.06);
    }
  `,
};

const ActionLink = styled(Link)<{ $variant: ActionVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 24px;
  border-radius: ${radii.md};
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color ${transitions.fast},
    filter ${transitions.fast};
  ${({ $variant }) => actionVariantStyle[$variant]}

  @media (max-width: ${breakpoints.columns}px) {
    min-height: 52px;
    font-size: 16px;
  }
`;

export default ActionLink;
