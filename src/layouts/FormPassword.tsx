import { Grid, Button, TextField, DialogContent, DialogActions, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "../contexts/SnackbarContext";
import { UsersService } from "../api/services/UsersService";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import * as yup from "yup";

interface Props {
  handleClose: () => void;
  id: number;
}

export function FormPassword({ handleClose, id }: Props) {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { showMessage } = useSnackbar();

  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required(),
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
      currentPassword: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await UsersService.updatePassword(id, values);

        if (response instanceof Error) {
          throw new Error(response.message);
        }

        if (response.status === 200) {
          showMessage("Registro alterado com sucesso!", "success");
          handleClose();
        }
      } catch (error: any) {
        showMessage(error.message || "Erro ao alterar o registro", "error");
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              name="currentPassword"
              type={showPassword.current ? "text" : "password"}
              label="Senha Atual"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              autoComplete="off"
              error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
              helperText={formik.touched.currentPassword && formik.errors.currentPassword}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => toggleShowPassword("current")}
                        edge="end"
                        size="small"
                      >
                        {showPassword.current ? <FaRegEyeSlash /> : <FaRegEye />}
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
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button type="submit" variant="contained">Salvar</Button>
      </DialogActions>
    </form>
  );
}
