import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { RolesService, type RoleProps } from "../../api/services/RoleService";
import { ColumnsTable } from "./ColumnsTable";
import { CreateRole } from "./Create";
import { EditRole } from "./Edit";
import { ConfirmationModal } from "../../components/modal/ConfirmationModal";
import { FormModal } from "../../components/modal/FormModal";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import { Permission } from "../../utils/Permission";
import { useDrawerContext } from "../../contexts/DrawerContext";

interface CreateButtonProps {
  handleModalCreate: () => void;
}

const CreateButton = ({ handleModalCreate }: CreateButtonProps) => {
  return (
    <IconButton
      title="Novo Perfil"
      color="success"
      sx={{ padding: "4px", marginLeft: "4px" }}
      onClick={() => handleModalCreate()}
    >
      <FaPlus />
    </IconButton>
  )
}

export const Roles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<RoleProps[]>([]);
  const [id, setId] = useState<number | null>(null);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const navigate = useNavigate();
  const { drawerOptions } = useDrawerContext();
  const { showMessage } = useSnackbar();
  const { user } = useAuthContext();

  const handleGetData = async (): Promise<any> => {
    try {
      const response = await RolesService.getAll();

      if (response instanceof Error) {
        throw new Error(response.message);
      }

      setData(response.data);
      setIsLoading(false);
    } catch {
      showMessage("Erro ao listar os registros", "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (user) {
        const path = Permission(drawerOptions, "/perfis", user?.roles.name);

        if (!path) {
          navigate("/");
          return;
        }
      }

      await handleGetData();
    }

    void fetchData();
  }, [user]);

  const handleModalCreate = () => {
    setOpenModalCreate(!openModalCreate);
  };

  const handleModalCreateClose = () => {
    setOpenModalCreate(false);
  };

  const handleModalEdit = (id: number | null) => {
    setId(id);
    setOpenModalEdit(!openModalEdit);
  };

  const handleModalEditClose = () => {
    setId(null);
    setOpenModalEdit(false);
  };

  const handleModalDelete = (id: number | null) => {
    setId(id);
    setOpenModalDelete(!openModalDelete);
  };

  const handleModalDeleteClose = () => {
    setId(null);
    setOpenModalDelete(false);
  };

  const handleConfirm = async () => {
    try {
      if (id) {
        const response = await RolesService.deleteById(id);

        if (response instanceof Error) {
          throw new Error(response.message);
        }

        if (response.status === 204) {
          await handleGetData();
          handleModalDeleteClose();
          showMessage("Registro excluido com sucesso", "success");
        }
      }
    } catch (error: any) {
      await handleGetData();
      handleModalDeleteClose();
      showMessage(error.message || "Erro ao excluir o registro", "error");
    }
  }

  return (
    <>
      <FormModal
        open={openModalCreate}
        handleClose={handleModalCreateClose}
        handleGetData={handleGetData}
        title="Novo Perfil"
        Form={CreateRole}
        width="xs"
      />

      <FormModal
        open={openModalEdit}
        handleClose={handleModalEditClose}
        handleGetData={handleGetData}
        title="Editar Perfil"
        Form={EditRole}
        id={id}
        width="xs"
      />

      <ConfirmationModal
        open={openModalDelete}
        handleConfirm={handleConfirm}
        handleClose={handleModalDeleteClose}
        message="Deseja realmente excluir o registro?"
      />

      {!isLoading && (
        <ColumnsTable
          data={data}
          handleModalEdit={handleModalEdit}
          handleModalDelete={handleModalDelete}
          CreateButton={() =>
            <CreateButton handleModalCreate={handleModalCreate} />
          }
        />
      )}
    </>
  );
}
