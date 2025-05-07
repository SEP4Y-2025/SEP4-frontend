import React, { useState, useEffect } from "react";
import PlantTypeRow from "../components/MyPlants/PlantTypeRow";
import AddPlantTypeModal from "../components/MyPlants/AddPlantTypeModal";
import "./MyPlants.css";
import { getPlantTypes, addPotToPlantType } from "../services/plantPotsRepo";
import { PlantType } from "../types";
import { addPlantType } from "../services/plantPotsRepo";




const MyPlants: React.FC = () => {
  const {plantTypes, pots, loading, environmnentName, error} = useEnvironmentCtx();
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [dosage, setDosage] = useState("");



  // useEffect(() => {
  //   const fetchPlantTypes = async () => {
  //     const plants = await getPlantTypes();
  //     setPlantTypes(plants);
  //   };

  //   fetchPlantTypes();
  // }, []);

  const handleContinue = async () => {
  if (!typeName || !wateringFrequency || !dosage) {
    setError("Please fill out all fields.");
    return;
  }

  const watering = parseInt(wateringFrequency, 10);
  const dose = parseInt(dosage, 10);

    if (watering < 0 || dose < 0) {
      //setError("Values cannot be negative.");
      return;
    }

  const environmentId = "680f8359688cb5341f9f9c19"; // ✅ Move this here

  try {
    await addPlantType(environmentId, {
      plant_type_name: typeName,
      watering_freq: watering,
      water_dosage: dose,
    });

    // ✅ Re-fetch plant types to update UI from backend
    const updated = await getPlantTypes();
    setPlantTypes(updated);

    // Reset modal state
    setTypeName("");
    setWateringFrequency("");
    setDosage("");
    //setError("");
    setOpen(false);
  } catch (err) {
    setError("Failed to add plant type.");
  }
};


  const handleCancel = () => {
    setOpen(false);
    //setError("");
  };


  return (
    <div className="plants-page">
      <h1 className="page-title">My Plants - {environmnentName}</h1>

      <div className="plants-list">
  {plantTypes.map((plant, index) => (
    <PlantTypeRow 
      key={index} 
      plant={plant} 
      pots={pots
        .filter(pot => pot.plantTypeId === plant._id)
        .map(pot => ({
          id: pot.potId,
          potName: pot.name 
        }))}
    />
  ))}
</div>

      <button className="add-type-button" onClick={() => setOpen(true)}>
        Add new type
      </button>

      {open && (
        <AddPlantTypeModal
          typeName={typeName}
          setTypeName={setTypeName}
          wateringFrequency={wateringFrequency}
          setWateringFrequency={setWateringFrequency}
          dosage={dosage}
          setDosage={setDosage}
          error={error}
          handleContinue={handleContinue}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default MyPlants;