import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MyPlants from "./pages/MyPlants";
import AddPlant from "./pages/AddPlant";
import PlantDetails from "./pages/PlantDetails";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/plants" replace />} />
        <Route path="/plants" element={<MyPlants />} />
        <Route path="/addplant/:typeName" element={<AddPlant />} />
        <Route path="/plant/:id" element={<PlantDetails />} />
      </Routes>
    </Router>
  );
};

export default App;