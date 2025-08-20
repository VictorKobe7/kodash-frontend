import { Alert, Button, Divider, Grid, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { Link as RouterLink } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import * as yup from "yup";

export const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuthContext();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      email: "admin@example.com",
      password: "123456"
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response: any = await login(values);

        if (response instanceof Error) {
          throw new Error(response.message);
        }
      } catch (error: any) {
        setError(error.message);
      }
    }
  });

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Stack direction="row" justifyContent="center" alignItems="baseline">
          <Typography variant="h3">Login</Typography>
        </Stack>
      </Grid>

      <Grid size={12}>
        <form onSubmit={formik.handleSubmit}>
          {error && (
            <Grid mb={2}>
              <Alert variant="filled" severity="error" icon={<MdErrorOutline />}>
                {error}
              </Alert>
            </Grid>
          )}
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                name="email"
                type="email"
                label="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                label="Senha"
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
                          onClick={() => toggleShowPassword()}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Grid>

            <Grid sx={{ mt: -1 }}>
              <Link variant="h6" component={RouterLink} to="/forgot-password" color="primary">
                Esqueceu a senha?
              </Link>
            </Grid>

            <Grid size={12}>
              <Button fullWidth type="submit" variant="contained">Login</Button>
            </Grid>

            <Grid size={12} sx={{ mt: 1 }}>
              <Divider />
            </Grid>

            <Grid size={12} sx={{ textAlign: "center" }}>
              <Link variant="h6" component={RouterLink} to="/first-access" color="primary">
                Primeiro Acesso
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
