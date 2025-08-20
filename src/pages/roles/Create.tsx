import { Grid, Button, TextField, DialogContent, DialogActions } from "@mui/material";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { RolesService } from "../../api/services/RoleService";
import * as yup from "yup";

interface Props {
  handleGetData: () => void;
  handleClose: () => void;
}

export function CreateRole({ handleGetData, handleClose }: Props) {
  const { showMessage } = useSnackbar();

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await RolesService.create(values);
        
        if (response instanceof Error) {
          throw new Error(response.message);
        }

        if (response.status === 201) {
          showMessage("Cadastro realizado com sucesso!", "success");
          handleGetData();
          handleClose();
        }
      } catch (error: any) {
        showMessage(error.message || "Erro ao realizar o cadastro", "error");
      }
    }
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Nome"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button type="submit" variant="contained">Cadastrar</Button>
      </DialogActions>
    </form>
  );
}
