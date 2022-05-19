import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

interface AddButtonProps {
  [rest: string]: DefaultComponentProps<any>;
}

const TrashButton = ({ ...rest }: AddButtonProps) => {
  return (
    <IconButton {...rest}>
      <DeleteIcon />
    </IconButton>
  );
};

export default TrashButton;
