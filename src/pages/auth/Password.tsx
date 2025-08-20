import { Button, Divider, Grid, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { AuthService } from "../../api/services/AuthService";
import { MaskedTextField } from "../../components/MaskedTextField";
import { useState } from "react";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useFormik } from "formik";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { removeMask } from "../../utils/RemoveMask";
import { useAuthContext } from "../../contexts/AuthContext";
import * as yup from "yup";

export const Password = ({ page }: { page: string }) => {
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const { showMessage } = useSnackbar();
  const { logout } = useAuthContext();

  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const validationSchema = yup.object().shape({
    cpf: yup.string().required(),
    password: yup.string()
      .matches(
        passwordRules,
        "A nova senha deve conter ao menos 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo"
      )
      .required(),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Senhas não coincidem").required(),
  });
  const formik = useFormik({
    initialValues: {
      cpf: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      values.cpf = removeMask(values.cpf);

      try {
        const response = page === "forgot-password" ? await AuthService.password(values) : await AuthService.firstAccess(values);

        if (response instanceof Error) {
          throw new Error(response.message);
        }

        if (response.status === 200) {
          showMessage("Registro alterado com sucesso!", "success");
          logout();
          window.location.href = "/login";
        }
      } catch (error: any) {
        showMessage(error.message || "Erro ao alterar o registro", "error");
      }
    }
  });

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">{page === "forgot-password" ? "Recuperar Senha" : "Primeiro Acesso"}</Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <MaskedTextField
                name="cpf"
                label="CPF"
                mask="000.000.000-00"
                value={formik.values.cpf}
                onChange={formik.handleChange}
                error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                helperText={formik.touched.cpf && formik.errors.cpf}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                name="password"
                type={showPassword.new ? "text" : "password"}
                label="Nova Senha"
                value={formik.values.password}
                onChange={formik.handleChange}
                autoComplete="off"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleShowPassword("new")}
                          edge="end"
                          size="small"
                        >
                          {showPassword.new ? <FaRegEyeSlash /> : <FaRegEye />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                name="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                label="Confirme a Nova Senha"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                autoComplete="off"
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleShowPassword("confirm")}
                          edge="end"
                          size="small"
                        >
                          {showPassword.confirm ? <FaRegEyeSlash /> : <FaRegEye />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Grid>

            <Grid size={12} mt={1}>
              <Button fullWidth type="submit" variant="contained">
                {page === "forgot-password" ? "Alterar Senha" : "Cadastrar"}
              </Button>
            </Grid>

            <Grid size={12} sx={{ mt: 1 }}>
              <Divider />
            </Grid>

            <Grid size={12} sx={{ textAlign: "center" }}>
              <Link variant="h6" component={RouterLink} to="/login" color="primary">
                Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
