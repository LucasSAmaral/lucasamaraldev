'use client';
import React, { createContext, useState } from 'react';
import { MenuStatus, UpdateMenuStatus } from './NavigationMenu.component';

type NavigationMenuContext = {
  navigationMenuMobileStatus: MenuStatus;
  updateNavigationMenuMobileStatus: UpdateMenuStatus;
};

export const NavigationMenuContext = createContext<NavigationMenuContext>({
  navigationMenuMobileStatus: 'CLOSED',
  updateNavigationMenuMobileStatus: () => {},
});

NavigationMenuContext.displayName = 'NavigationMenuContext';

export const NavigationMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [navigationMenuMobileStatus, updateNavigationMenuMobileStatus] =
    useState<MenuStatus>('CLOSED');

  return (
    <NavigationMenuContext.Provider
      value={{
        navigationMenuMobileStatus,
        updateNavigationMenuMobileStatus,
      }}
    >
      {children}
    </NavigationMenuContext.Provider>
  );
};
