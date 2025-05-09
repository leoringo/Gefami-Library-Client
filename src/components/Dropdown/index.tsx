// components/ReusableDropdown.tsx
import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

interface DropdownOption {
  label: string;
  value: string | number;
}

interface ReusableDropdownProps {
  label: string;
  value: string | number;
  options: DropdownOption[];
  onChange: (value: string | number) => void;
  fullWidth?: boolean;
}

const ReusableDropdown: React.FC<ReusableDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  fullWidth = false,
}) => {
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const selectedValue =
      typeof event.target.value === "string" &&
      !isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : event.target.value;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth={fullWidth} size="small" sx={{ marginTop: '20px', marginBottom: '20px', width: '200px'}}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ReusableDropdown;
