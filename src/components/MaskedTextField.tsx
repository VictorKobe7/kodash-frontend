import { forwardRef } from "react";
import { TextField, type TextFieldProps } from "@mui/material";
import { IMaskInput } from "react-imask";

interface MaskedTextFieldProps extends Omit<TextFieldProps, "onChange" | "value"> {
  name: string;
  mask: string;
  value: string;
  onChange: (event: React.ChangeEvent<any>) => void;
  definitions?: object;
}

const MaskedInput = forwardRef<HTMLInputElement, any>(function MaskedInput(props, ref) {
  const { onChange, name, mask, definitions, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={definitions}
      inputRef={ref}
      onAccept={(value: any) =>
        onChange({ target: { name, value } })
      }
      overwrite
    />
  );
});

export const MaskedTextField: React.FC<MaskedTextFieldProps> = ({
  name,
  value,
  onChange,
  mask,
  definitions,
  error,
  helperText,
  ...props
}) => {
  return (
    <TextField
      {...props}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      InputProps={{
        inputComponent: MaskedInput as any,
        inputProps: {
          name,
          mask,
          definitions,
        },
      }}
      fullWidth
    />
  );
};
