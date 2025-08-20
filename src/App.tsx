import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { DrawerProvider } from "./contexts/DrawerContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import "./locales/yup";
import { AuthProvider } from "./contexts/AuthContext";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppThemeProvider>
          <SnackbarProvider>
            <DrawerProvider>
              <AppRoutes />
            </DrawerProvider>
          </SnackbarProvider>
        </AppThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
