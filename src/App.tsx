import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogsPage from "./pages/LogsPage";
import Navbar from "./components/common/Navbar";
import MyPlants from "./pages/MyPlants";
import { Container } from "@mui/material";
import AddPlant from "./pages/AddPlant";
//import PlantDetails from "./pages/PlantDetails"
import { EnvironmentProvider } from "./contexts/EnvironmentContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { darkTheme, lightTheme } from "./Styles/themes/Themes";
import { ThemeProvider } from "styled-components";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
//POPUP STUFF for auth, subject to change
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./contexts/UserAuthContext";
import Register from "./pages/Auth/Register";
import ProfilePage from "./pages/Profile";
import MyEnvironmnets from "./pages/MyEnvironmnets";
import Assistants from "./pages/Assistants";
//-----------------------------------------------------
const App: React.FC = () => {
  const [darkMode, setDarkmode] = useState(false);

  return (
    <Router>
      <UserContextProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Navbar />
          <Container>
            <ToastContainer />
            <Routes>
              <Route
                path="/logs"
                element={
                  <ProtectedRoute>
                    <LogsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/plants"
                element={
                  <ProtectedRoute>
                    <EnvironmentProvider>
                      <MyPlants />
                    </EnvironmentProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <EnvironmentProvider>
                      <MyEnvironmnets />
                    </EnvironmentProvider>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/addplant/:typeName"
                element={
                  <ProtectedRoute>
                    <EnvironmentProvider>
                      <AddPlant />
                    </EnvironmentProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/loremIpsum"
                element={
                  <ProtectedRoute>
                    <EnvironmentProvider>
                      <Assistants />
                    </EnvironmentProvider>
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/plant-details/:id"
                element={
                  <ProtectedRoute>
                    <EnvironmentProvider>
                      <PlantDetails />
                    </EnvironmentProvider>
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Container>
        </ThemeProvider>
      </UserContextProvider>
    </Router>
  );
};

export default App;
