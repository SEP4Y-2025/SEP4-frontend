import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PlantDetails from "../../src/pages/PlantDetails";
import { useEnvironmentCtx } from "../../src/contexts/EnvironmentContext";
import { beforeEach, describe, vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../src/contexts/EnvironmentContext", () => ({
  useEnvironmentCtx: vi.fn(),
}));

describe("PlantDetails", () => {
  const mockProps = {
    pots: [
      {
        potId: "123",
        name: "Aloe Vera",
        plantTypeId: "plant123",
        state: {
          temperature: ["raw", "22.3"],
          soilHumidity: ["raw", "45"],
          airHumidity: ["raw", "55"],
        },
        waterTank: {
          currentLevelMl: 750,
          capacityMl: 1000,
          status: "Good",
        },
      },
    ],
    plantTypes: [
      {
        _id: "plant123",
        name: "Aloe",
        water_frequency: 2,
        water_dosage: 300,
      },
    ],
    loading: false,
    error: null,
    environmentName: "",
    setEnvironmentName: vi.fn(),
    setEnvironmentID: vi.fn(),
    setPlantTypes: vi.fn(),
  };

  const mockedUseEnvironmentCtx = useEnvironmentCtx as jest.Mock;

  beforeEach(() => {
    mockedUseEnvironmentCtx.mockReturnValue(mockProps);
  });

  it("displays the correct temperature value from state", () => {
    render(
      <MemoryRouter initialEntries={["/plants/123"]}>
        <Routes>
          <Route path="/plants/:id" element={<PlantDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("temperature")).toHaveTextContent("22.3°C");
  });

  it("displays 'Plant not found' if the pot is missing", () => {
    mockedUseEnvironmentCtx.mockReturnValue({ ...mockProps, pots: [] });

    render(
      <MemoryRouter initialEntries={["/plants/123"]}>
        <Routes>
          <Route path="/plants/:id" element={<PlantDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Plant not found")).toBeInTheDocument();
  });

  it("navigates to the plants page when the save button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/plants/123"]}>
        <Routes>
          <Route path="/plants/:id" element={<PlantDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const saveButton = screen.getByText("Save");
    saveButton.click();

    expect(mockNavigate).toHaveBeenCalledWith("/plants");
  });
});