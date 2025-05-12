import React, { createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mfaVerified, setMfaVerified] = useState(false);

  // on mount, try to fetch /auth/profile
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setUser(data.user);
        setMfaVerified(data.mfaVerified);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  const signIn = async (creds) => {
    // 1) call /auth/login → returns short-lived token & mfaRequired flag
    // 2) if MFA required, call /auth/mfa → setMfaVerified(true)
    // 3) store tokens in secure storage
  };

  const signOut = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("csrf_token");
    setUser(null);
    setMfaVerified(false);
  };

  return (
    <AuthContext.Provider value={{ user, mfaVerified, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
