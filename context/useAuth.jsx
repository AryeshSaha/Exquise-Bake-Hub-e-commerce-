import { loadingAtom, userAtom, userDetailsAtom } from "@/global/Atoms";
import { BaseUrl } from "@/pages/_app";
import axios from "axios";
import { useAtom } from "jotai";
import { createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // logged in or not
  const [user, setUser] = useAtom(userAtom);
  const [userDetails, setUserDetails] = useAtom(userDetailsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  useEffect(() => {
    tokenExpiry();
    console.log("useEffect from useAuth");
  }, [user]);

  // check token validity
  const tokenExpiry = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`${BaseUrl}/api/fetchme`, {
        withCredentials: true,
      });
      if (data.success) {
        // Review: Token Expiry
        setUser(true);
        setUserDetails(data.user);
        setLoading(false);
      }
    } catch (error) {
      await axios.get(`${BaseUrl}/api/sessionexpire`, {
        withCredentials: true,
      });
      setUser(false);
      setLoading(false);
      console.log("from token expiry: ",error.response?.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        setUserDetails,
        user,
        setUser,
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
