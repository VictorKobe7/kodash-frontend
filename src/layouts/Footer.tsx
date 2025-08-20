import { Link, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router";

export const Footer = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack direction={smDown ? "column" : "row"} justifyContent="space-between" alignItems="center" sx={{ py: 2, mt: "auto" }}>
      <Typography variant="caption">Copyright &copy; - Todos os direitos reservados</Typography>
      <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
        <Link component={RouterLink} to="*" target="_blank" variant="caption" color="textPrimary">
          Sobre nós
        </Link>
        <Link component={RouterLink} to="*" target="_blank" variant="caption" color="textPrimary">
          Privacidade
        </Link>
        <Link component={RouterLink} to="*" target="_blank" variant="caption" color="textPrimary">
          Termos
        </Link>
      </Stack>
    </Stack>
  )
};
