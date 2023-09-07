import { BaseUrl } from "@/pages/_app";
import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState()
  const [tokenExpired, setTokenExpired] = useState(true);
  const [loading, setLoading] = useState(true)
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
      console.log("Yes token");
      tokenExpiry();
      if (router.pathname === "/login" || router.pathname === "/signup") {
        router.push("/");
      }
    }
  }, [router.query]);

  // check token validity
  const tokenExpiry = async () => {
    setLoading(true)
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const { data } = await axios.get(`${BaseUrl}/api/fetchme`, config);
      if (data.success) {
        setTokenExpired(false);
        setUser(token);
        setUserDetails(data.user)
        setLoading(false)
      }
    } catch (error) {
      setTokenExpired(true);
      localStorage.removeItem("token")
      setLoading(false)
      console.log(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider value={{ userDetails, setUserDetails, user, setUser, tokenExpired, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
