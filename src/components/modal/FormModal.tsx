import { Dialog, DialogTitle, IconButton, styled, type Breakpoint } from "@mui/material";
import { IoClose } from "react-icons/io5";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2)
  }
}));

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  Form: any;
  id?: string | number | null;
  handleGetData?: () => void;
  width?: false | Breakpoint | undefined;
}

export const FormModal = ({ open, handleClose, title, Form, id, handleGetData, width = "md" }: Props) => {
  return (
    <BootstrapDialog fullWidth maxWidth={width} onClose={handleClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <IoClose />
      </IconButton>

      <Form handleGetData={handleGetData} handleClose={handleClose} id={id} />
    </BootstrapDialog>
  );
}
