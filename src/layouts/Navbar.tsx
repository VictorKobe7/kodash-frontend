import { Box, Icon, IconButton, useTheme } from "@mui/material";
import { useAppThemeContext } from "../contexts/ThemeContext";
import { useDrawerContext } from "../contexts/DrawerContext";
import { Profile } from "./Profile";

export const Navbar = () => {
  const theme = useTheme();
  const { toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme, themeName } = useAppThemeContext();

  return (
    <Box height={64} display="flex" justifyContent="space-between" alignItems="center" pl={1} sx={{ bgcolor: themeName === "light" ? "primary.main" : theme.palette.background.paper }}>
      <IconButton onClick={toggleDrawerOpen}>
        <Icon sx={{ color: "white" }}>menu</Icon>
      </IconButton>
      <Box display="flex" gap={1} zIndex={10}>
        <IconButton onClick={toggleTheme}>
          <Icon sx={{ color: "white" }}>{themeName === "light" ? "dark_mode" : "light_mode"}</Icon>
        </IconButton>
        <Profile />
      </Box>
    </Box>
  );
};
