import axios from "axios";

import { getCookie } from "../utilities/storage-helpers";
import { loginUrl, productUrl, updateProductUrl, logoutUrl, signupUrl } from "./urls";

export const request = async (url, action, data = null) => {
  const csrftoken = getCookie("csrftoken");
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    ...(csrftoken && { "X-CSRFToken": csrftoken }),
  };

  try {
    const response = await axios({
      method: action,
      url,
      data,
      headers: headers,
      withCredentials: true
    });
    return response;
  } catch (error) {
    if (error.response.status === 500) {
      error.response["data"] = {
        detail: "Server Error. Please try again in a few minute or reach out to info@jamlyf.com."
      }
      return error;
    } else if (error.response.statusText === "Unauthorized") {
      error.response["data"] = {
        detail: "Login and ensure that the email or password provider are correct."
      }
      return error;
    } else {
      return error.response;
    }
  }
};

export const userSignUp = async data => {
  return await request(signupUrl(), "post", data);
};

export const userLogin = async data => {
  return await request(loginUrl(), "post", data);
};

export const userLogout = async () => {
  return await request(logoutUrl(), "post");
}

export const getProduct = async queryParams => {
  return await request(productUrl(queryParams), "get");
};

export const createProduct = async data => {
  return await request(productUrl(), "post", data);
};

export const updateProduct = async (id, data) => {
  return await request(updateProductUrl(id), "put", data);
};
