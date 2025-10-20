import { createContext, useContext, useEffect, useState } from "react";
import PageLoader from "../components/Layout/PageLoader.jsx";
import { GetMe } from "../lib/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await GetMe();
      setAuthUser(response?.user);
    } catch (err) {
      setAuthUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, authLoading }}>
      {authLoading ? <PageLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
