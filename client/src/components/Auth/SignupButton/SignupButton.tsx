import { Link } from "react-router-dom";
import { useAuth } from "contexts/auth";
import styles from "./SignupButton.module.css";

/** Interfaces/types */

/** components */
import { Button } from "@mui/material";
import { useEffect } from "react";
import { signupRoute } from "Router/routes/client";

interface ISignupButtonProps {
  [rest: string]: any;
}

const SignupButton = ({ ...rest }: ISignupButtonProps) => {
  const { auth } = useAuth();

  if (auth) return null;

  return (
    <Link to={signupRoute.path} className={styles["link"]}>
      <Button variant="contained" color="primary" {...rest}>
        {signupRoute.name}
      </Button>
    </Link>
  );
};

export default SignupButton;
