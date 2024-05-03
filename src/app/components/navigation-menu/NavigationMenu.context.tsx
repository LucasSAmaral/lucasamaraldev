'use client';
import React, { createContext, useState } from 'react';

export type ActualRoute = '/' | '/about-me' | '/work-experience' | '/contact';

export type NavigationMenuState = {
  actualRouteState: ActualRoute;
};

type NavigationMenuContext = {
  navigationMenuState: NavigationMenuState;
  updateNavigationMenuState: React.Dispatch<React.SetStateAction<NavigationMenuState>>;
};

const initialState: NavigationMenuState = {
  actualRouteState: '/',
};

export const NavigationMenuContext = createContext<NavigationMenuContext>({
  navigationMenuState: initialState,
  updateNavigationMenuState: () => {},
});

NavigationMenuContext.displayName = 'NavigationMenuContext';

export const NavigationMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [navigationMenuState, updateNavigationMenuState] = useState<NavigationMenuState>({
    actualRouteState: '/',
  });

  return (
    <NavigationMenuContext.Provider
      value={{
        navigationMenuState: navigationMenuState,
        updateNavigationMenuState: updateNavigationMenuState,
      }}
    >
      {children}
    </NavigationMenuContext.Provider>
  );
};
