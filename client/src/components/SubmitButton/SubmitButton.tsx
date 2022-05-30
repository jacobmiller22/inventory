import _ from "lodash";

/** Interfaces/types */
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { Status } from "interfaces";

/** components */
import { Button } from "@mui/material";
import { Loader } from "components";

interface SubmitButtonProps {
  isValid: boolean;
  isSubmitting: boolean;
  buttonProps?: DefaultComponentProps<any>;
  status?: Status;
  text?: string;
  successText?: string;
}

const SubmitButton = ({
  isValid,
  isSubmitting,
  text = "Submit",
  buttonProps,
  status,
  successText = "Success",
}: SubmitButtonProps) => {
  const error = status === Status.ERROR;

  const ButtonContent = () => {
    if (status === Status.ERROR) {
      return <span>Error</span>;
    }

    if (isSubmitting) {
      return <Loader size={24.5} />;
    }

    if (status === Status.SUCCESS) {
      return <span>{successText}</span>;
    }

    return <span>{text}</span>;
  };

  return (
    <Button
      type="submit"
      variant="contained"
      disabled={!isValid || isSubmitting}
      color={error ? "error" : "primary"}
      {...buttonProps}
    >
      <ButtonContent />
    </Button>
  );
};

export default SubmitButton;
