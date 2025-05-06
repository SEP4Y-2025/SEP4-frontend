import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogsPage from "./pages/LogsPage";
import Navbar from "./components/common/Navbar";
import MyPlants from "./pages/MyPlants";
import { Container } from "@mui/material";
import AddPlant from "./pages/AddPlant";
import { EnvironmentProvider } from "./contexts/EnvironmentContext";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<LogsPage />} />
          <Route path="/plants" element={<EnvironmentProvider><MyPlants /></EnvironmentProvider>} />
          <Route path="/addplant/:typeName" element={<EnvironmentProvider><AddPlant /></EnvironmentProvider>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
