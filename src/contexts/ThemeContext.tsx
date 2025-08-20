import { Box, ThemeProvider } from "@mui/material";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LightTheme } from "../themes/Light";
import { DarkTheme } from "../themes/Dark";

interface ThemeContextProps {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as ThemeContextProps);

interface ThemeProviderProps {
  children: ReactNode;
}

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
}

export const AppThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeName, setThemeName] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => {
      const newTheme = oldThemeName === "light" ? "dark" : "light";
      localStorage.setItem("app-theme", newTheme);
      return newTheme;
    });
  }, []);

  const theme = useMemo(() => {
    return themeName === "light" ? LightTheme : DarkTheme;
  }, [themeName]);

  useEffect(() => {
    const stored = localStorage.getItem("app-theme");
    if (stored && stored !== themeName) {
      setThemeName(stored === "dark" ? "dark" : "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100%" minHeight="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
