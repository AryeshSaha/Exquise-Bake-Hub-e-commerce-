import { BaseUrl } from "@/pages/_app";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [tokenExpired, setTokenExpired] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tokenExpiry();
    console.log("useEffect from useAuth");
  }, []);

  // check token validity
  const tokenExpiry = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`${BaseUrl}/api/fetchme`, {
        withCredentials: true,
      });
      if (data.success) {
        // Review: Token Expiry
        setTokenExpired(false);
        setUser(true);
        setUserDetails(data.user);
        setLoading(false);
      }
    } catch (error) {
      setTokenExpired(true);
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        setUserDetails,
        user,
        setUser,
        tokenExpired,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
