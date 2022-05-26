import { ReactNode } from "react";
import AuthGuard from "../AuthGuard";

interface AuthViewProps {
  children: React.ReactNode | ReactNode[];
}

const AuthView = ({ children }: AuthViewProps) => {
  return (
    <div>
      <br />
      <AuthGuard reverse>{children}</AuthGuard>
    </div>
  );
};

export default AuthView;
