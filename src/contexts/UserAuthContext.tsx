import React, { createContext, useEffect, useState } from "react";
import { UserProfile } from "../types/User";
import { data, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

interface Props {
  children: React.ReactNode;
}
const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {

          const userObj = {
            user_id: res?.data.user_id,
            message: res?.data.message,
          };
          localStorage.setItem("user", JSON.stringify(userObj.user_id));
          setUser(userObj.user_id!);
          toast.success(userObj.message);
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };
  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.access_token);
          const userObj = {
            userName: res?.data.user_id,
          };
          localStorage.setItem("user", JSON.stringify(userObj.userName));
          setToken(res?.data.token!);
          setUser(userObj.userName!);
          toast.success("Login succesfull");
          navigate("/plants");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
