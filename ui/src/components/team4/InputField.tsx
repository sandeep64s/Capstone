import { TextField } from "@mui/material";
import { useField } from "formik";

const InputField = ({ label, ...props }: { label: string; name: string }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      variant="standard"
    />
  );
};

export default InputField;
