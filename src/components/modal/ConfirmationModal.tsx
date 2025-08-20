import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { IoClose } from "react-icons/io5";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

interface Props {
  open: boolean,
  handleConfirm: any,
  handleClose: any,
  message: string,
}

export const ConfirmationModal = ({ open, handleConfirm, handleClose, message }: Props) => {
  return (
    <>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Confirmação</DialogTitle>
        <IconButton
          aria-label="close"
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
        <DialogContent dividers>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="center">
            <Grid>
              <Button autoFocus variant="contained" color="error" onClick={handleConfirm}>Sim</Button>
            </Grid>
            <Grid marginLeft={2}>
              <Button autoFocus variant="contained" color="success" onClick={handleClose}>Não</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
