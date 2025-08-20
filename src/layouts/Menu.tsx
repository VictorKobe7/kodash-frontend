import { Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import logo from "../assets/logo/logo1.png";
import { useDrawerContext } from "../contexts/DrawerContext";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

interface ListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink = ({ to, icon, label, onClick }: ListItemLinkProps) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  }

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

interface MenuProps {
  children: React.ReactNode
}

export const Menu = ({ children }: MenuProps) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { user } = useAuthContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={mdDown ? "temporary" : "persistent"} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(32.5)} height="100%" display="flex" flexDirection="column">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ my: 1.5 }}
          >
            <Link to="/">
              <img src={logo} alt="Logo" height={36} />
            </Link>
          </Box>

          <Divider />

          <Box flex={1} overflow="auto">
            <List component="nav">
              {drawerOptions.filter((option) => !option.rules || option.rules.includes(user?.roles.name || "")).map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  to={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={mdDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={!isDrawerOpen || mdDown ? 0 : theme.spacing(32.5)}>
        {children}
      </Box>
    </>
  )
}
