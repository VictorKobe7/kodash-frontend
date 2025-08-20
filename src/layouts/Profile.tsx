import { Avatar, Box, Button, CardContent, ClickAwayListener, Divider, Grid, Icon, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FormModal } from "../components/modal/FormModal";
import { FormEditUser } from "./FormEditUser";
import { FormPassword } from "./FormPassword";
import { getInitials } from "../utils/GetInitials";
import { useAuthContext } from "../contexts/AuthContext";

export const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);

  const { user, logout } = useAuthContext();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleOpenModalProfile = () => {
    setOpenModalProfile(true);
    handleClose();
  }

  const handleCloseModalProfile = () => {
    setOpenModalProfile(false);
  }

  const handleOpenModalPassword = () => {
    setOpenModalPassword(true);
    handleClose();
  }

  const handleCloseModalPassword = () => {
    setOpenModalPassword(false);
  }

  return (
    <>
      <Box sx={{ pr: 3 }}>
        <Button
          sx={{
            p: 0.25,
            bgcolor: open ? "#1565c0" : "transparent",
            borderRadius: 1,
            "&:hover": { bgcolor: "#1565c0" },
          }}
          onClick={handleOpen}
        >
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
            <Avatar alt="Perfil de usuário" sx={{ width: 32, height: 32 }}>
              {getInitials(user?.name || "")}
            </Avatar>
            <Typography variant="subtitle1" color="white" sx={{ textTransform: "capitalize" }}>
              {user?.name}
            </Typography>
          </Stack>
        </Button>

        <Popper
          open={open}
          anchorEl={anchorEl}

          placement="bottom-end"
          disablePortal
          popperOptions={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 9]
                }
              }
            ]
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Paper sx={{ width: 250 }}>
              <CardContent sx={{ px: 2.5, pt: 2 }}>
                <Grid container justifyContent="center" direction="column" alignItems="center">
                  <Grid>
                    <Stack spacing={1.25} alignItems="center">
                      <Avatar alt="Perfil de usuário" sx={{ width: 52, height: 52, fontSize: 26 }}>
                        {getInitials(user?.name || "")}
                      </Avatar>
                      <Stack justifyContent="center" alignItems="center">
                        <Typography variant="h6">{user?.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {user?.roles.name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <List component="nav">
                <ListItemButton onClick={handleOpenModalProfile}>
                  <ListItemIcon>
                    <Icon>person</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Editar Perfil" />
                </ListItemButton>

                <ListItemButton onClick={handleOpenModalPassword}>
                  <ListItemIcon>
                    <Icon>password</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Alterar Senha" />
                </ListItemButton>

                <ListItemButton onClick={() => logout()}>
                  <ListItemIcon>
                    <Icon color="error">logout</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Sair" />
                </ListItemButton>
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Box>

      <FormModal
        open={openModalProfile}
        handleClose={handleCloseModalProfile}
        title="Editar Perfil"
        Form={FormEditUser}
        id={user?.id}
        width="xs"
      />

      <FormModal
        open={openModalPassword}
        handleClose={handleCloseModalPassword}
        title="Alterar Senha"
        Form={FormPassword}
        id={user?.id}
        width="xs"
      />
    </>
  );
};
