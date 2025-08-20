import { createTheme } from "@mui/material";
import { Typography } from "./Typography";
import { Breakpoints } from "./Breakpoints";
import { Components } from "./Components";

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF"
    },
    primary: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB",
      contrastText: "#FFFFFF"
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
      contrastText: "#FFFFFF"
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#B45309",
      contrastText: "#000000"
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#B91C1C",
      contrastText: "#FFFFFF"
    },
    text: {
      secondary: "#8c8c8c"
    }
  },
  breakpoints: Breakpoints(),
  components: Components(),
  typography: Typography,
})
