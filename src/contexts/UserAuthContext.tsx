import React, { createContext, useEffect, useRef, useState } from "react";
import { UserProfile } from "../types/User";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Node } from "typescript";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

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
  const logoutTimer = useRef<number | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");
    if (storedUser && storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          logout();
          return;
        }

        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + storedToken;

        const expiresIn = decoded.exp * 1000 - Date.now();
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = window.setTimeout(() => {
          toast.info("Session expired. Logging out.");
          logout();
        }, expiresIn);
      } catch (err) {
        toast.error("Invalid token");
        logout();
      }
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await axios.post(`${API_URL}/auth/registration`, {
        username,
        password,
        email,
      });

      if (res.data?.user_id) {
        const newUser: UserProfile = {
          userName: username,
          email,
          user_id: res.data.user_id,
        };
        sessionStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        toast.success(res.data.message || "Registration successful");
        await loginUser(email, password);
      } else {
        toast.error("Registration failed.");
      }
    } catch (err) {
      toast.error("Server error occurred during registration");
    }
  };
  const loginUser = async (username: string, password: string) => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const res = await axios.post(`${API_URL}/auth/login`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (res.data?.access_token && res.data?.user_id) {
        const f = await axios.get(`${API_URL}/users/${res.data.user_id}`);
        const newUser: UserProfile = {
          userName: f.data.username,
          email: f.data.email,
          user_id: res.data.user_id,
        };

        sessionStorage.setItem("token", res.data.access_token);
        sessionStorage.setItem("user", JSON.stringify(newUser));

        setToken(res.data.access_token);
        setUser(newUser);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access_token}`;

        const decoded: any = jwtDecode(res.data.access_token);
        const expiresIn = decoded.exp * 1000 - Date.now();

        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = window.setTimeout(() => {
          toast.info("Session expired. Logging out.");
          logout();
        }, expiresIn);

        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.error("Server error occurred during login");
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, registerUser, user, token, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
