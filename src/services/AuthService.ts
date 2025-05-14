import axios from "axios";
import { RegisterResponse, UserProfileToken } from "../types/User";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const loginAPI = async (username: string, password: string) => {
  try {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    const data = await axios.post(API_URL + "/auth/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data;
  } catch (err) {
    //TODO proper error handler for global usage
    console.log(err);
  }
};

export const registerAPI = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const data = await axios.post(API_URL + "/auth/register", {
      username: username,
      password: password,
      email: email,
    });
    return data;
  } catch (err) {
    //TODO proper error handler for global usage
    console.log(err);
  }
};
