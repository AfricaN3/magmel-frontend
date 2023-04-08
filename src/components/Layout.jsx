import React, { useState, useEffect } from "react";

import { useWallet } from "@rentfuse-labs/neo-wallet-adapter-react";
import { ToastContainer } from "react-toastify";

import axiosInstance from "../api";
import { Footer, Header } from "./index";
import Routers from "../routes/Routers";
import { toastMessage } from "../utils";

import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./layout.css";

const Layout = () => {
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
          setUser(JSON.stringify(authObject));
        }
      } catch (error) {
        console.log(error);
        if (error.description) {
          toastMessage("error", error.description, 5000);
        }
      }
    };

    if (connected || address) {
      getToken();
    }
  }, [address, connected, user]);
  return (
    <div className="layout">
      <ToastContainer theme="dark" />
      <Header />
      <Routers />
      <Footer />
    </div>
  );
};

export default Layout;
