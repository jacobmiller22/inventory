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
}

const AuthGuard = ({ children, reverse = false }: IAuthGuardProps) => {
  const navigate = useNavigate();
  const { auth, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
    if (reverse && auth) {
      navigate(indexRoute.path);
      return;
    }
    if (!reverse && !auth) {
      navigate(loginRoute.path);
      return;
    }
  }, []);

  if (reverse && auth) {
    return null;
  }

  if (!reverse && !auth) {
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
