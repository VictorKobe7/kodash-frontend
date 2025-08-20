import { Grid, Button, TextField, FormHelperText, DialogContent, DialogActions, Autocomplete, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RolesService } from "../../api/services/RoleService";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { CPFValidator } from "../../utils/CPFValidator";
import { removeMask } from "../../utils/RemoveMask";
import { MaskedTextField } from "../../components/MaskedTextField";
import { UsersService } from "../../api/services/UsersService";
import * as yup from "yup";

interface Props {
  handleGetData: () => void;
  handleClose: () => void;
  id: number;
}

interface UserProps {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  role_id?: string;
  status?: string | boolean;
}

interface RolesProps {
  id?: string;
  name: string;
}

export function EditUser({ handleGetData, handleClose, id }: Props) {
  const [user, setUser] = useState<UserProps>();
  const [roles, setRoles] = useState<RolesProps[]>([]);

  const { showMessage } = useSnackbar();

  const handleGetUser = async (): Promise<void> => {
    try {
      const response = await UsersService.getById(id);

      if (response instanceof Error) {
        throw new Error(response.message);
      }

      setUser(response);
    } catch (error: any) {
      handleClose();
      showMessage("Erro ao exibir o registro", "error");
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

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
    role_id: yup.number().required(),
    status: yup.string()
  });

  useEffect(() => {
    if (user) {
      void formik.setValues({
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        role_id: user.role_id || "",
        status: user.status === "Ativo"
      });
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cpf: "",
      role_id: "",
      status: false as boolean | string
    },
    validationSchema,
    onSubmit: async (values) => {
      values.cpf = removeMask(values.cpf);

      try {
        const response = await UsersService.updateById(id, values);

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

          <Grid size={{ xs: 12, sm: 4, md: 5 }} sx={{ marginTop: -1 }}>
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

          <Grid size={{ xs: 12, sm: 5 }} sx={{ marginTop: -1 }}>
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

          <Grid size={{ xs: 12, sm: 3, md: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  name="status"
                  checked={Boolean(formik.values.status)}
                  onChange={formik.handleChange}
                />
              }
              label="Ativo"
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
