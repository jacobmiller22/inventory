import { Button, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
/** Interfaces/types */

/** components */
import BackIcon from "@mui/icons-material/ArrowBackSharp";

type BackButtonProps = {
  onClick?: (e: React.SyntheticEvent) => void;
  asLink?: boolean;
  href?: string;
  [rest: string]: any;
};

const BackButton = ({
  onClick,
  asLink = false,
  href,
  ...rest
}: BackButtonProps) => {
  const navigate = useNavigate();

  if ((asLink && !href) || (!asLink && href)) {
    throw new Error("BackButton: asLink and href must be used together");
  }

  if (!asLink) {
    return (
      <Tooltip title="Go back">
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            onClick && onClick(e);
            navigate(-1);
          }}
          startIcon={<BackIcon />}
          {...rest}
        >
          Back
        </Button>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Go back">
      <Link to={href!}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          startIcon={<BackIcon />}
          {...rest}
        >
          Back
        </Button>
      </Link>
    </Tooltip>
  );
};

export default BackButton;
