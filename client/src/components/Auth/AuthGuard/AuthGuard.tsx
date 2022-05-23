/**
 * Auth Guard for components. This is different from the view AuthGuard in the sense that this component does not navigate, but rather simply hides content unless authorized
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/auth";
import React from "react";
import { indexRoute, loginRoute } from "Router/routes/client";
/** Interfaces/types */

/** components */

interface IAuthGuardProps {
  children: React.ReactNode | React.ReactNode[];
  reverse?: boolean;
  admin?: boolean;
}

const AuthGuard = ({
  children,
  reverse = false,
  admin = false,
}: IAuthGuardProps) => {
  const { auth, checkAuth, isAdmin } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [auth]);

  if (reverse && (auth || (admin && isAdmin()))) {
    return null;
  }

  if (!reverse && (!auth || (admin && !isAdmin()))) {
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
