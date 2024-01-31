"use client";
import React, { createContext, useState } from "react";

export type ActualRoute =
  | "/"
  | "/about-me"
  | "/technical-skills"
  | "/work-experience"
  | "/contact";

export type MenuState = {
  actualRouteState: ActualRoute;
};

type MenuContext = {
  menuState: MenuState;
  updateMenuState: React.Dispatch<React.SetStateAction<MenuState>>;
};

const initialState: MenuState = {
  actualRouteState: "/",
};

export const MenuContext = createContext<MenuContext>({
  menuState: initialState,
  updateMenuState: () => {},
});

MenuContext.displayName = "MenuContext";

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuState, updateMenuState] = useState<MenuState>({
    actualRouteState: "/",
  });

  return (
    <MenuContext.Provider
      value={{
        menuState,
        updateMenuState,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
