import {
  BaseUrl,
  loadingAtom,
  userAtom,
  userDetailsAtom,
} from "@/global/Atoms";
import axios from "axios";
import { useAtom } from "jotai";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userDetails, setUserDetails] = useAtom(userDetailsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

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
      try {
        await axios.get(`${BaseUrl}/api/sessionexpire`, {
          withCredentials: true,
        });
        setUser(false);
      } catch (err) {
        setUser(false);
      }
      setLoading(false);
    }
  };

  return {
    user,
    setUser,
    userDetails,
    setUserDetails,
    loading,
    setLoading,
    tokenExpiry,
  };
};

export default useAuth;
