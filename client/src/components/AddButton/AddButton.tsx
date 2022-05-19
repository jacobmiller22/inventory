import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

interface AddButtonProps {
  [rest: string]: DefaultComponentProps<any>;
}

const AddButton = ({ ...rest }: AddButtonProps) => {
  return (
    <Button startIcon={<AddIcon />} {...rest}>
      Add
    </Button>
  );
};

export default AddButton;
