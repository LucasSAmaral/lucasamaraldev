import { useContext } from 'react';
import styled from 'styled-components';
import { LanguageOptionsContext } from '@/app/components/language-options/LanguageOptions.context';
import { GitHubIcon, LinkedInIcon, getSocialUrls } from '@/app/components/SocialLinks.component';
import { VisuallyHidden } from '@/app/styles/styles';
import { breakpoints, colors, radii, transitions } from '@/app/styles/theme';
import config from '../../../../generated-config.json';

const {
  locale: {
    commonLocale: {
      contact: { shortcuts },
    },
    ...locale
  },
} = config;

const ContactShortcutsComponent: React.FC = () => {
  const {
    languageOptionsState: { selectedLanguage },
  } = useContext(LanguageOptionsContext);

  const socialUrls = getSocialUrls(selectedLanguage);

  const shortcutList = [
    { ...shortcuts.linkedIn, url: socialUrls.linkedIn, icon: <LinkedInIcon size={20} /> },
    { ...shortcuts.gitHub, url: socialUrls.gitHub, icon: <GitHubIcon size={20} /> },
  ];

  return (
    <ShortcutList>
      {shortcutList.map(({ label, handle, url, icon }) => (
        <li key={label}>
          <Shortcut href={url} target="_blank" rel="noopener noreferrer">
            <ShortcutIcon>{icon}</ShortcutIcon>
            <ShortcutText>
              <ShortcutLabel>{label}</ShortcutLabel>
              <ShortcutHandle>{handle}</ShortcutHandle>
            </ShortcutText>
            <VisuallyHidden> ({locale[selectedLanguage].contact.opensInNewTab})</VisuallyHidden>
          </Shortcut>
        </li>
      ))}
    </ShortcutList>
  );
};

const ShortcutList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
  list-style: none;
`;

const Shortcut = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid ${colors.border};
  border-radius: 14px;
  background-color: ${colors.surface};
  color: ${colors.text};
  text-decoration: none;
  transition:
    border-color ${transitions.fast},
    background-color ${transitions.fast};

  &:hover {
    border-color: rgba(255, 255, 255, 0.18);
    background-color: ${colors.surfaceHover};
  }

  @media (max-width: ${breakpoints.columns}px) {
    padding: 14px 16px;
  }
`;

const ShortcutIcon = styled.span`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radii.md};
  background-color: ${colors.accentSoft};
  color: ${colors.accent};
`;

const ShortcutText = styled.span`
  display: flex;
  flex-direction: column;
`;

const ShortcutLabel = styled.span`
  color: ${colors.textSubtle};
  font-size: 13px;
`;

const ShortcutHandle = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export default ContactShortcutsComponent;
