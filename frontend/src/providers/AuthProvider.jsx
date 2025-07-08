import { useState } from "react";
import { AuthContext } from "../context";

export default function AuthProvider({ children }) {
  const [auth, setAuthState] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : {};
  });

  const setAuth = (data) => {
    setAuthState(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setAuthState({});
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
