/** Interfaces/types */

import { TextField } from "@mui/material";

/** components */

type NumberFieldProps = {
  [field: string]: any;
};

const NumberField = ({ ...field }: NumberFieldProps) => {
  return (
    <TextField
      placeholder={field.placeholder}
      type="number"
      variant="standard"
      InputLabelProps={{
        shrink: true,
      }}
      label={`${field.label}${field.required ? "*" : ""}`}
      required={field.required}
      {...field}
      error={field.error}
      helperText={field.error ? field.error : field.helperText || " "}
    />
  );
};

export default NumberField;
