import React, { createContext, useEffect, useState } from "react";
import { UserProfile } from "../types/User";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser({ userName: JSON.parse(storedUser) });
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
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
        email,
      });

      if (res.data?.user_id) {
        const newUser: UserProfile = { userName: res.data.user_id };
        localStorage.setItem("user", JSON.stringify(newUser.userName));
        setUser(newUser);
        toast.success(res.data.message || "Registration successful");
        navigate("/");
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
        const newUser: UserProfile = { userName: res.data.user_id };

        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(newUser.userName));

        setToken(res.data.access_token);
        setUser(newUser);

        axios.defaults.headers.common["Authorization"] =
          `Bearer ${res.data.access_token}`;

        toast.success("Login successful");
        navigate("/environments");
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
