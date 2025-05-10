import axios from "axios";
import { UserProfileToken } from "../types/User";

const API_URL = process.env.REACT_APP_API_URL || "LOREM IPSUm"; //TODO LOREM IPSUM

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(API_URL + "/auth/login", {
      username: username,
      password: password,
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
    const data = await axios.post<UserProfileToken>(
      API_URL + "/auth/register",
      {
        email: email,
        username: username,
        password: password,
      }
    );
    return data;
  } catch (err) {
    //TODO proper error handler for global usage
    console.log(err);
  }
};
