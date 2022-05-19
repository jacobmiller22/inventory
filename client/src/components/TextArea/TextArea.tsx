/** Interfaces/types */

import { TextField } from "@mui/material";

/** components */

interface ITextAreaProps {
  [field: string]: any;
}

const TextArea = ({ ...field }: ITextAreaProps) => {
  return (
    <TextField
      placeholder={field.placeholder}
      multiline
      maxRows={Infinity}
      variant="standard"
      InputLabelProps={{
        shrink: true,
      }}
      {...field}
      error={field.error}
      helperText={field.error ? field.error : field.helperText || " "}
    />
  );
};

export default TextArea;
