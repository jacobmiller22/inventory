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
  const navigate = useNavigate();
  const { auth, checkAuth, isAdmin } = useAuth();

  useEffect(() => {
    checkAuth();
    if ((reverse && auth) || (admin && isAdmin())) {
      navigate(indexRoute.path);
      return;
    }
    if ((!reverse && !auth) || (admin && !isAdmin())) {
      navigate(loginRoute.path);
      return;
    }
  }, [auth]);

  if ((reverse && auth) || (admin && isAdmin())) {
    return null;
  }

  if ((!reverse && !auth) || (admin && !isAdmin())) {
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
