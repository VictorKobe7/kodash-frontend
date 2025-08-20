import { Box, Card, Grid } from "@mui/material";
import logo from "../assets/logo/logo1.png";
import { Outlet } from "react-router";
import { Footer } from "./Footer";
import GuestGuard from "../api/services/GuestGuard";
import { usePageTitle } from "../hooks/Title";

export const AuthLayout = () => {
  usePageTitle("");

  return (
    <GuestGuard>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Box display="flex" sx={{ p: 2.5 }}>
          <img src={logo} alt="Logo" height={36} />
        </Box>

        <Grid
          size={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          <Card
            sx={{
              maxWidth: { xs: 350 },
              margin: { xs: 2.5, md: 10 },
              padding: { xs: 2.5, md: 3 }
            }}
          >
            <Outlet />
          </Card>
        </Grid>
        <Grid sx={{ mx: 3 }}>
          <Footer />
        </Grid>
      </Box>
    </GuestGuard>
  );
};
