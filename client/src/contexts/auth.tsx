import { Role, User } from "interfaces/user";
import _ from "lodash";
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext<any>({});

// export { userContext };

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [auth, setAuth] = useState<User | null>(user);

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!_.isEqual(user, auth)) {
      setAuth(user);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuth(null);
  };

  const isAdmin = (): boolean => {
    return Boolean(auth?.roles.includes(Role.ADMIN));
  };

  return (
    <ProfileContext.Provider value={{ auth, checkAuth, logout, isAdmin }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(ProfileContext);
