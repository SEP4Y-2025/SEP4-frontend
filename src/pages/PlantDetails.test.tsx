import React from "react";
import { render, screen } from "@testing-library/react";
import PlantDetails from "./PlantDetails";
import { useEnvironmentCtx } from "../contexts/EnvironmentContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

// mock the context
vi.mock("../contexts/EnvironmentContext", () => ({
  useEnvironmentCtx: vi.fn(),
}));

const mockedUseEnvironmentCtx = useEnvironmentCtx as unknown as ReturnType<
  typeof vi.fn
>;

describe("PlantDetails - Temperature", () => {
  it("displays correct temperature value from state", () => {
    mockedUseEnvironmentCtx.mockReturnValue({
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
          water_frequency: "Weekly",
          water_dosage: 300,
        },
      ],
      loading: false,
      error: null,
      environmentName: "",
      setEnvironmentName: vi.fn(),
      setEnvironmentID: vi.fn(),
      setPlantTypes: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/plants/123"]}>
        <Routes>
          <Route path="/plants/:id" element={<PlantDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("temperature")).toHaveTextContent("22.3°C");
  });
});
