import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogsPage from "./pages/LogsPage";
import Navbar from "./components/Navbar";
import MyPlants from "./pages/MyPlants";
import { Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<LogsPage />} />
          <Route path="/plants" element={<MyPlants />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
