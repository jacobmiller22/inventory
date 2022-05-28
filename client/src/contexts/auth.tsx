import { Role, User } from "interfaces/user";
import _ from "lodash";
import { createContext, useContext, useState, useEffect } from "react";
import { validateToken as __validateToken } from "api/auth";
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

  const isAdmin = (): boolean => {
    return Boolean(auth?.roles.includes(Role.ADMIN));
  };

  const validateToken = async () => {
    __validateToken();
    checkAuth();
  };

  useEffect(() => {
    console.log("Checking auth");

    validateToken();
  }, [auth, checkAuth, isAdmin]);

  const logout = () => {
    localStorage.removeItem("user");
    setAuth(null);
  };

  return (
    <ProfileContext.Provider value={{ auth, checkAuth, logout, isAdmin }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(ProfileContext);
