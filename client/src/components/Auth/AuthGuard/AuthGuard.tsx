/**
 * Auth Guard for components. This is different from the view AuthGuard in the sense that this component does not navigate, but rather simply hides content unless authorized
 */
import { useEffect } from "react";
import { useAuth } from "contexts/auth";
import React from "react";
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
  }, [auth, checkAuth]);

  if (reverse && (auth || (admin && isAdmin()))) {
    return null;
  }

  if (!reverse && (!auth || (admin && !isAdmin()))) {
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
