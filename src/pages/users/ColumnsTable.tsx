import { Table } from "../../components/table/Table";
import { IconButton } from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { TableBtnArea } from "../../components/table/styles";
import { useAuthContext } from "../../contexts/AuthContext";

export function ColumnsTable({ data, handleModalEdit, handleModalDelete, CreateButton }: any) {
  const { user } = useAuthContext();
  if (!data) {
    return;
  }

  const columns = [
    {
      header: "Nome",
      accessorKey: "name"
    },
    {
      header: "E-mail",
      accessorKey: "email"
    },
    {
      header: "Perfil",
      accessorKey: "roles.name"
    },
    {
      header: "Status",
      accessorKey: "status"
    },
    {
      header: "Ações",
      accessorKey: "id",
      cell: (cell: any) => {
        return (
          <>
            <TableBtnArea>
              <IconButton
                title="Editar Usuário"
                size="small"
                color="warning"
                sx={{ padding: "4px" }}
                onClick={() => handleModalEdit(cell.row.original.id)}
                disabled={cell.row.original.id === user?.id}
              >
                <FaEdit />
              </IconButton>

              <IconButton
                title="Excluir Usuário"
                size="small"
                color="error"
                sx={{ padding: "4px", marginLeft: "4px" }}
                onClick={() => handleModalDelete(cell.row.original.id)}
                disabled={cell.row.original.id === user?.id}
              >
                <FaTrashAlt />
              </IconButton>
            </TableBtnArea>
          </>
        );
      }
    }
  ];

  return (
    <Table {...{ data, columns, CreateButton }} />
  );
}
