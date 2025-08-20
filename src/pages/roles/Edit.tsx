import { Grid, Button, TextField, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RolesService } from "../../api/services/RoleService";
import { useSnackbar } from "../../contexts/SnackbarContext";
import * as yup from "yup";

interface Props {
  handleGetData: () => void;
  handleClose: () => void;
  id: number;
}

interface RoleProps {
  id?: string;
  name: string;
}

export function EditRole({ handleGetData, handleClose, id }: Props) {
  const [role, setRole] = useState<RoleProps>();
  const { showMessage } = useSnackbar();

  const handleGetRole = async (): Promise<void> => {
    try {
      const response = await RolesService.getById(id);

      if (response instanceof Error) {
        throw new Error(response.message);
      }

      setRole(response);
    } catch {
      handleClose();
      showMessage("Erro ao exibir o registro", "error");
    }
  };

  useEffect(() => {
    handleGetRole();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string().required()
  });

  useEffect(() => {
    if (role) {
      void formik.setValues({
        name: role.name
      });
    }
  }, [role]);

  const formik = useFormik({
    initialValues: {
      name: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await RolesService.updateById(id, values);

        if (response instanceof Error) {
          throw new Error(response.message);
        }

        if (response.status === 200) {
          handleClose();
          showMessage("Registro alterado com sucesso!", "success");
          handleGetData();
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
        <Button type="submit" variant="contained">Salvar</Button>
      </DialogActions>
    </form>
  );
}
