import { useWallet } from "@rentfuse-labs/neo-wallet-adapter-react";
import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : null
  );

  let { connected, address, signMessage } = useWallet();

  useEffect(() => {
    const getToken = async () => {
      if (user) {
        return;
      }
      try {
        let signedMessage = await signMessage({ message: "Welcome to MAGMEL" });
        let authObject = signedMessage.data;
        if (authObject) {
          localStorage.setItem("access_token", JSON.stringify(authObject));
          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (connected || address) {
      getToken();
    }
  }, [address, connected, user, signMessage]);

  let contextData = {
    user: user,
    setUser: setUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
