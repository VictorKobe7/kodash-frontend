import { Grid, Button, TextField, FormHelperText, DialogContent, DialogActions, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { CPFValidator } from "../../utils/CPFValidator";
import { MaskedTextField } from "../../components/MaskedTextField";
import { removeMask } from "../../utils/RemoveMask";
import { RolesService } from "../../api/services/RoleService";
import { UsersService } from "../../api/services/UsersService";
import * as yup from "yup";

interface Props {
  handleGetData: () => void;
  handleClose: () => void;
}

interface RolesProps {
  id?: string;
  name: string;
}

export function CreateUser({ handleGetData, handleClose }: Props) {
  const [roles, setRoles] = useState<RolesProps[]>([]);
  const { showMessage } = useSnackbar();

  const handleGetRoles = async (): Promise<void> => {
    try {
      const response = await RolesService.getAll();

      if (response instanceof Error) {
        throw new Error(response.message);
      }

      setRoles(response.data);
    } catch {
      showMessage("Erro ao listar os registros", "error");
    }
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    cpf: yup
      .string()
      .required()
      .test("cpf-valido", "CPF inválido", (value) => {
        if (value) {
          return CPFValidator(value);
        }
        return false;
      }),
    role_id: yup.number().required()
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cpf: "",
      role_id: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      values.cpf = removeMask(values.cpf);

      try {
        const response = await UsersService.create(values);

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
          <Grid size={{ xs: 12, sm: 6 }}>
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

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="email"
              label="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoComplete="off"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ marginTop: -1 }}>
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

          <Grid size={{ xs: 12, sm: 6 }} sx={{ marginTop: -1 }}>
            <Autocomplete
              value={formik.values.role_id ? roles.find((option) => option.id === formik.values.role_id) : null}
              onChange={(_event, newValue) => {
                void formik.setFieldValue("role_id", newValue?.id ?? "");
              }}
              options={roles}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Perfil"
                  placeholder="Selecione o perfil..."
                  error={formik.touched.role_id && Boolean(formik.errors.role_id)}
                />
              )}
            />
            {formik.touched.role_id && formik.errors.role_id && (
              <FormHelperText error id="helper-text-role_id">
                {formik.errors.role_id}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button type="submit" variant="contained">Cadastrar</Button>
      </DialogActions>
    </form>
  );
}
