import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const router = useRouter();
  const routes = ["/account", "/orders", "/checkout"]; //protected routes

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      if (routes.includes(router.pathname)) {
        console.log("No token");
        router.push("/login");
      }
    } else {
      setUser(token);
      console.log("Yes token");
      if (router.pathname === "/login" || router.pathname === "/signup") {
        router.push("/");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
