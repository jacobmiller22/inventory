/**
 *
 * AuthButton is a button that is used to log in or out of the application.
 *
 */

import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./AuthButton.module.css";

/** Auth */
import { useAuth } from "contexts/auth";

/** Components */
import Button from "@mui/material/Button";
import { Status } from "interfaces";

interface AuthButtonProps {
  className?: string;
}

const AuthButton = ({ className }: AuthButtonProps) => {
  const { auth, logout } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, _] = useState<Status>(Status._);

  const renderButton = () => {
    if (auth) {
      const text =
        status === Status._
          ? "Log Out"
          : status === Status.PENDING
          ? "Logging Out"
          : status === Status.SUCCESS
          ? "Success"
          : "Error";
      return (
        <Button
          className={className}
          variant="outlined"
          onClick={async () => {
            logout();
          }}
        >
          {text}
        </Button>
      );
    }

    const text =
      status === Status._
        ? "Log In"
        : status === Status.PENDING
        ? "Logging In"
        : status === Status.SUCCESS
        ? "Success"
        : "Error";
    return (
      <Link to="/auth/login" className={styles["link"]}>
        <Button variant="outlined" className={className}>
          {text}
        </Button>
      </Link>
    );
  };

  return <div>{renderButton()}</div>;
};

export default AuthButton;
