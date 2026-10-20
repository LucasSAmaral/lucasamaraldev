import styled from 'styled-components';
import { breakpoints, colors } from '@/app/styles/theme';
import SocialLinksComponent from './SocialLinks.component';

const FooterComponent: React.FC = () => {
  return (
    <Footer>
      <Copyright>© {new Date().getFullYear()} Lucas Amaral</Copyright>
      <SocialLinksComponent />
    </Footer>
  );
};

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px 48px;
  border-top: 1px solid ${colors.border};

  @media (max-width: ${breakpoints.columns}px) {
    padding: 20px;
  }
`;

const Copyright = styled.small`
  color: ${colors.textSubtle};
  font-size: 14px;
`;

export default FooterComponent;
