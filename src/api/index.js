import axios from "axios";

import { toastMessage } from "../utils";

const { NODE_ENV } = process.env;

let baseURL;

if (NODE_ENV === "development") {
  baseURL = "http://localhost:8080/api/v1/";
} else {
  baseURL = "https://magmel-backend.onrender.com/api/v1/";
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    // const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      toastMessage(
        "error",
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly",
        5000
      );
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      toastMessage(
        "error",
        `${error.response.data}. Please refresh browser and sign message with your wallet`,
        15000
      );
      return Promise.reject(error);
    }

    if (error.response.status === 403) {
      toastMessage("error", `${error.response.data}`, 5000);
      return Promise.reject(error);
    }

    if (error.response.status === 400) {
      toastMessage("error", `${error.response.data}`, 10000);
      return Promise.reject(error);
    }

    if (error.response.status === 500) {
      toastMessage(
        "error",
        "Server Error: We're sorry, but something went wrong on our end. " +
          "Please try again later. If the problem persists, please contact AfricaN3. " +
          "Thank you for your understanding.",
        10000
      );
      return Promise.reject(error);
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
