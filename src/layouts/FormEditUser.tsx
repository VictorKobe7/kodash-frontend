import { Grid, Button, TextField, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "../contexts/SnackbarContext";
import { CPFValidator } from "../utils/CPFValidator";
import { MaskedTextField } from "../components/MaskedTextField";
import { removeMask } from "../utils/RemoveMask";
import { UsersService } from "../api/services/UsersService";
import * as yup from "yup";

interface Props {
  handleClose: () => void;
  id: number;
}

interface UserProps {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  status: string;
}

export function FormEditUser({ handleClose, id }: Props) {
  const [user, setUser] = useState<UserProps>();
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
      })
  });

  useEffect(() => {
    if (user) {
      void formik.setValues({
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        status: user.status
      });
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cpf: "",
      status: "Ativo"
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
          showMessage("Registro alterado com sucesso!", "success");
          handleClose();

          window.location.reload();
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
              name="name"
              label="Nome"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid size={12}>
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
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button type="submit" variant="contained">Salvar</Button>
      </DialogActions>
    </form>
  );
}
