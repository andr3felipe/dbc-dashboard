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
  const [theme, setTheme] = useState(getTheme());

  function getTheme() {
    const getTheme = localStorage.getItem("theme");
    const theme = getTheme ? JSON.parse(getTheme) : null;

    return theme?.themeTitle === "dark" ? darkTheme : lightTheme;
  }

  function toggleTheme() {
    setTheme(theme.themeTitle === "light" ? darkTheme : lightTheme);

    localStorage.setItem(
      "theme",
      JSON.stringify(theme.themeTitle === "light" ? darkTheme : lightTheme)
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
