import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { PaletteMode } from "@mui/material";

interface ThemeContextType {
  toggleTheme: () => void;
  mode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#1976d2",
                },
                secondary: {
                  main: "#dc004e",
                },
                background: {
                  default: "#e8e8e8",
                  paper: "#f5f5f5",
                },
                text: {
                  primary: "#000000",
                  secondary: "#555555",
                },
              }
            : {
                primary: {
                  main: "#eee",
                },
                secondary: {
                  main: "#222222",
                },
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#bbbbbb",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
