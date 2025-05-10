import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogsPage from "./pages/LogsPage";
import Navbar from "./components/common/Navbar";
import MyPlants from "./pages/MyPlants";
import { Container } from "@mui/material";
import AddPlant from "./pages/AddPlant";
import PlantDetails from "./pages/PlantDetails";
import { EnvironmentProvider } from "./contexts/EnvironmentContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { darkTheme, lightTheme } from "./Styles/Themes";
import { ThemeProvider } from "styled-components";
//POPUP STUFF for auth, subject to change
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./contexts/UserAuthContext";
//-----------------------------------------------------
const App: React.FC = () => {
  const [darkMode, setDarkmode] = useState(false);

  return (
    <UserContextProvider>
      <Router>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Navbar />
          <Container>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<LogsPage />} />
              <Route
                path="/plants"
                element={
                  <EnvironmentProvider>
                    <MyPlants />
                  </EnvironmentProvider>
                }
              />
              <Route
                path="/addplant/:typeName"
                element={
                  <EnvironmentProvider>
                    <AddPlant />
                  </EnvironmentProvider>
                }
              />
              <Route
                path="/plant-details/:id"
                element={
                  <EnvironmentProvider>
                    <PlantDetails />
                  </EnvironmentProvider>
                }
              />
            </Routes>
          </Container>
        </ThemeProvider>
      </Router>
    </UserContextProvider>
  );
};

export default App;
