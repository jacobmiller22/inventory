import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

interface AddButtonProps {
  [rest: string]: DefaultComponentProps<any>;
}

const TrashButton = ({ ...rest }: AddButtonProps) => {
  return (
    <Tooltip title="Delete">
      <IconButton {...rest}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TrashButton;
