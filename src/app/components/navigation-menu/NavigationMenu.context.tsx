'use client';
import React, { createContext, useState } from 'react';
import { MenuStatus, UpdateMenuStatus } from './NavigationMenu.component';

export type ActualRoute = '/' | '/about-me' | '/work-experience' | '/contact';

export type NavigationMenuState = {
  actualRouteState: ActualRoute;
};

type NavigationMenuContext = {
  navigationMenuState: NavigationMenuState;
  navigationMenuMobileStatus: MenuStatus;
  updateNavigationMenuState: React.Dispatch<React.SetStateAction<NavigationMenuState>>;
  updateNavigationMenuMobileStatus: UpdateMenuStatus;
};

const initialState: NavigationMenuState = {
  actualRouteState: '/',
};

export const NavigationMenuContext = createContext<NavigationMenuContext>({
  navigationMenuState: initialState,
  navigationMenuMobileStatus: 'CLOSED',
  updateNavigationMenuState: () => {},
  updateNavigationMenuMobileStatus: () => {},
});

NavigationMenuContext.displayName = 'NavigationMenuContext';

export const NavigationMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [navigationMenuState, updateNavigationMenuState] = useState<NavigationMenuState>({
    actualRouteState: '/',
  });

  const [navigationMenuMobileStatus, updateNavigationMenuMobileStatus] =
    useState<MenuStatus>('CLOSED');

  return (
    <NavigationMenuContext.Provider
      value={{
        navigationMenuState,
        navigationMenuMobileStatus,
        updateNavigationMenuState,
        updateNavigationMenuMobileStatus,
      }}
    >
      {children}
    </NavigationMenuContext.Provider>
  );
};
