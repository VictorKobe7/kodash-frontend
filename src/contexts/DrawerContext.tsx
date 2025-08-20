import { useMediaQuery, useTheme } from "@mui/material";
import { createContext, useCallback, useContext, useState } from "react";

interface DrawerContextProps {
  isDrawerOpen: boolean;
  drawerOptions: DrawerOptions[];
  toggleDrawerOpen: () => void;
  setDrawerOptions: (newDrawerOptions: DrawerOptions[]) => void;
}

interface DrawerOptions {
  icon: string;
  path: string;
  label: string;
  rules?: string[];
}

const DrawerContext = createContext({} as DrawerContextProps);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
}

interface DrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(!mdDown);
  const [drawerOptions, setDrawerOptions] = useState<DrawerOptions[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, [])

  const handleSetDrawerOptions = useCallback((newDrawerOptions: DrawerOptions[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
};
