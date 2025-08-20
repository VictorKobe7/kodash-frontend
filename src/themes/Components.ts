import type { Components as MUIComponents } from "@mui/material";

export const Components = (): MUIComponents => ({
  MuiTextField: {
    defaultProps: {
      size: "small"
    }
  },
  MuiFormControl: {
    defaultProps: {
      margin: "dense"
    }
  },
  MuiSelect: {
    defaultProps: {
      size: "small",
      margin: "dense"
    }
  },
  MuiCheckbox: {
    defaultProps: {
      size: "small"
    }
  },
  MuiRadio: {
    defaultProps: {
      size: "small"
    }
  },
  MuiOutlinedInput: {
    defaultProps: {
      size: "small"
    }
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginLeft: 0
      }
    }
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true
    }
  }
});
