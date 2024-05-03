import { useState } from 'react';

export type MenuStatus = 'CLOSED' | 'CLOSING' | 'OPENED' | 'OPENING';

const useMenuStatus = () => {
  const [menuMobileStatus, updateMenuMobileStatus] = useState<MenuStatus>('CLOSED');

  const [languageMenuStatus, updateLanguageMenuStatus] = useState<MenuStatus>('CLOSED');

  return { menuMobileStatus, updateMenuMobileStatus, languageMenuStatus, updateLanguageMenuStatus };
};

export default useMenuStatus;
