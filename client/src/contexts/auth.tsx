import { createContext, useContext, useState } from "react";

const ProfileContext = createContext<any>({});

// export { userContext };

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [auth, setAuth] = useState<any>(user);

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setAuth(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuth(null);
  };

  console.log("auth", auth);

  return (
    <ProfileContext.Provider value={{ auth, checkAuth, logout }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const { auth, checkAuth, logout } = useContext(ProfileContext);
  console.log("useAuth", auth);
  return { auth, checkAuth, logout };
};
