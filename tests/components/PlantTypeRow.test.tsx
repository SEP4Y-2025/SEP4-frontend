import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PlantTypeRow from "../../src/components/MyPlants/PlantTypeRow";
import {
  EnvironmentProvider,
  useEnvironmentCtx,
} from "../../src/contexts/EnvironmentContext";
import { BrowserRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock("../../src/contexts/EnvironmentContext", async () => {
  const originalModule = await vi.importActual(
    "../../src/contexts/EnvironmentContext"
  );
  return {
    ...originalModule,
    useEnvironmentCtx: () => ({ isOwner: true }),
    EnvironmentProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

const mockPlant = {
  _id: "plant1",
  name: "Cactus",
  watering_frequency: 3,
  water_dosage: 200,
};

const mockPots = [
  { id: "pot1", potName: "Pot 1" },
  { id: "pot2", potName: "Pot 2" },
];

test("renders plant type info and pots", () => {
  render(
    <BrowserRouter>
      <EnvironmentProvider>
        <PlantTypeRow plant={mockPlant} pots={mockPots} />
      </EnvironmentProvider>
    </BrowserRouter>
  );

  expect(screen.getByText(/Type: Cactus/i)).toBeInTheDocument();
  expect(screen.getByText(/3x\/week/i)).toBeInTheDocument();
  expect(screen.getByText(/200ml/i)).toBeInTheDocument();

  expect(screen.getByText("Pot 1")).toBeInTheDocument();
  expect(screen.getByText("Pot 2")).toBeInTheDocument();
});

test("renders Add plant button and navigates on click", () => {
  render(
    <BrowserRouter>
      <EnvironmentProvider>
        <PlantTypeRow plant={mockPlant} pots={mockPots} />
      </EnvironmentProvider>
    </BrowserRouter>
  );

  const addButton = screen.getByRole("button", { name: /Add plant/i });
  expect(addButton).toBeInTheDocument();

  fireEvent.click(addButton);

  expect(mockedNavigate).toHaveBeenCalledWith("/addplant/Cactus");
});
