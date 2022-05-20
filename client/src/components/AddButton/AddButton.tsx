import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

interface AddButtonProps {
  [rest: string]: DefaultComponentProps<any>;
}

const AddButton = ({ ...rest }: AddButtonProps) => {
  return (
    <Tooltip title="Add">
      <Button startIcon={<AddIcon />} {...rest}>
        Add
      </Button>
    </Tooltip>
  );
};

export default AddButton;
