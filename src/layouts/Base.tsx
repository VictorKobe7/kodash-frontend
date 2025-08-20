import { Box, Container, Typography } from "@mui/material";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Menu } from "./Menu";
import { Outlet, useLocation } from "react-router";
import { useDrawerContext } from "../contexts/DrawerContext";
import AuthGuard from "../api/services/AuthGuard";
import { usePageTitle } from "../hooks/Title";

export const Base = () => {
  const location = useLocation();
  const { drawerOptions } = useDrawerContext();

  const currentPage = drawerOptions.find(opt => opt.path === location.pathname);
  const title = currentPage?.label ?? "";

  usePageTitle(title);

  return (
    <AuthGuard>
      <Menu>
        <Box height="100%" display="flex" flexDirection="column">
          <Navbar />

          <Box flex={1} overflow="auto" px={{ xs: 0, sm: 6 }} pt={2}>
            <Container
              maxWidth={false}
              sx={{
                minHeight: "calc(100vh - 80px)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Typography variant="h1" mb={2} noWrap>
                {title}
              </Typography>
              <Outlet />
              <Footer />
            </Container>
          </Box>
        </Box>
      </Menu>
    </AuthGuard>
  );
}
