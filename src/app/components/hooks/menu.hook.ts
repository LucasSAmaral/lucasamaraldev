import { useState } from 'react';

export type MenuStatus = 'CLOSED' | 'CLOSING' | 'OPENED' | 'OPENING';

const useMenuStatus = () => {
  const [navigationMenuMobileStatus, updateNavigationMenuMobileStatus] =
    useState<MenuStatus>('CLOSED');

  const [languageMenuStatus, updateLanguageMenuStatus] = useState<MenuStatus>('CLOSED');

  return {
    navigationMenuMobileStatus,
    updateNavigationMenuMobileStatus,
    languageMenuStatus,
    updateLanguageMenuStatus,
  };
};

export default useMenuStatus;
