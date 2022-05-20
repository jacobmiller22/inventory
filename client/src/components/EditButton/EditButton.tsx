import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

interface AddButtonProps {
  [rest: string]: DefaultComponentProps<any>;
}

const EditButton = ({ ...rest }: AddButtonProps) => {
  return (
    <Tooltip title="Edit">
      <IconButton {...rest}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
