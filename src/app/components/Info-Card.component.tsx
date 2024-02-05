import styled, { css } from 'styled-components';

const InfoCardComponent: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  left?: boolean;
  right?: boolean;
}> = ({ children, left, right, onClick = () => {} }) => {
  return (
    <InfoCard $left={left} $right={right} onClick={onClick}>
      {children}
    </InfoCard>
  );
};

export const InfoCard = styled.div.attrs<{ $left?: boolean; $right?: boolean }>(props => ({
  $left: props.$left || false,
  $right: props.$right || false,
}))`
  background-color: #363c3f;
  padding: 20px;
  width: 300px;
  text-align: left;
  border-radius: 4px;
  position: relative;

  p {
    font-size: 12px;
  }

  h3 {
    font-size: 16px;
    margin-top: 20px;
  }

  ${({ $right, $left }) =>
    $right || $left
      ? css`
          cursor: pointer;
          &:before {
            content: '+';
            width: 20px;
            height: 20px;
            background-color: #843235;
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 20px;
            font-weight: 500;
            box-shadow: 0px 0px 2px 7px rgb(255, 255, 254, 0.2);
            top: 15px;
            ${$left &&
            css`
              right: -33px;
            `}

            ${$right &&
            css`
              left: -33px;
            `}
          }

          &:after {
            content: ' ';
            width: 10px;
            height: 10px;
            background-color: #363c3f;
            display: block;
            position: absolute;
            transform: rotate(45deg);
            top: 22px;
            ${$left &&
            css`
              right: -5px;
            `}

            ${$right &&
            css`
              left: -5px;
            `}
          }
        `
      : ''}
`;

export default InfoCardComponent;
