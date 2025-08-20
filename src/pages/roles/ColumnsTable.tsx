import { Table } from "../../components/table/Table";
import { IconButton } from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { TableBtnArea } from "../../components/table/styles";

export function ColumnsTable({ data, handleModalEdit, handleModalDelete, CreateButton }: any) {
  if (!data) {
    return;
  }

  const columns = [
    {
      header: "Nome",
      accessorKey: "name"
    },
    {
      header: "Ações",
      accessorKey: "id",
      cell: (cell: any) => {
        return (
          <>
            <TableBtnArea>
              <IconButton
                title="Editar Perfil"
                size="small"
                color="warning"
                sx={{ padding: "4px" }}
                onClick={() => handleModalEdit(cell.row.original.id)}
                disabled={cell.row.original.name === "Admin"}
              >
                <FaEdit />
              </IconButton>

              <IconButton
                title="Excluir Pefil"
                size="small"
                color="error"
                sx={{ padding: "4px", marginLeft: "4px" }}
                onClick={() => handleModalDelete(cell.row.original.id)}
                disabled={cell.row.original.name === "Admin"}
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
