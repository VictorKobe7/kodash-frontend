import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { OutlinedInput, InputAdornment, type OutlinedInputProps } from "@mui/material";
import { FaSearch } from "react-icons/fa";

interface Props extends OutlinedInputProps {
  value: string | number;
  onFilterChange: (value: string | number) => void;
  debounce?: number;
}

export const DebouncedInput: FC<Props> = ({
  value: initialValue,
  onFilterChange,
  debounce = 500,
  size,
  startAdornment = <FaSearch />,
  ...props
}) => {
  const [value, setValue] = useState<number | string>(initialValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <OutlinedInput
      {...props}
      value={value}
      onChange={handleInputChange}
      sx={{ minWidth: 100 }}
      startAdornment={
        <InputAdornment position="start" sx={{ mr: 1 }}>
          {startAdornment}
        </InputAdornment>
      }
      {...(size && { size })}
    />
  );
};
