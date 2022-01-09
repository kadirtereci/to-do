import { FormControl, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";

export interface LabeledCheckboxProps {
  checked?: boolean;
  onChange?: (event: any) => void;
  label: string;
  name?: string;
  color?: "primary" | "secondary" | "default";
  disabled?: boolean;
}

const LabeledCheckbox: React.FC<LabeledCheckboxProps> = ({
  checked,
  onChange,
  label,
  name,
  color,
  disabled,
}) => {
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            name={name}
            color={color || "primary"}
          />
        }
        label={checked ? <del> {label}</del> : label}
      />
    </FormControl>
  );
};

export default LabeledCheckbox;
