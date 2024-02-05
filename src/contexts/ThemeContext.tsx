import { createContext, useState } from "react";
import { darkTheme } from "../styles/themes/dark";
import { lightTheme } from "../styles/themes/light";
import { ThemeType } from "../@types/styled";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  getTheme: () => ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(getTheme());

  function getTheme() {
    const getTheme = localStorage.getItem("theme");
    const theme = getTheme ? getTheme : null;

    return theme === "dark" ? darkTheme : lightTheme;
  }

  function toggleTheme() {
    setTheme(theme.themeTitle === "light" ? darkTheme : lightTheme);

    localStorage.setItem(
      "theme",
      JSON.stringify(
        theme.themeTitle === "light"
          ? darkTheme.themeTitle
          : lightTheme.themeTitle
      )
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
