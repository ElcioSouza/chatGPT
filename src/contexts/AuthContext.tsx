import { ReactNode, createContext, useEffect } from "react";
import { getItem, removeItem, setItem } from "@/lib/storage";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  setAuthToken: (token: string) => void;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    } catch (e) {
      return null;
    }
  };

  const setAuthToken = (token: string | null) => {
    if (!token) {
      removeItem("vendure-auth-token");
      return;
    }

    setItem("vendure-auth-token", token);
  };

  useEffect(() => {
    const token = getItem("vendure-auth-token");

    if (token) {
      const { exp } = parseJwt(token) || {};

      if (exp && exp * 1000 < Date.now()) {
        setAuthToken(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}
