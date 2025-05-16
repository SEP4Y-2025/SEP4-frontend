import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MyPlants from "../../src/pages/MyPlants";
import { useEnvironmentCtx } from "../../src/contexts/EnvironmentContext";
import { addPlantType, getTypesByEnvironment } from "../../src/services/plantTypesApi";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, Mock, vi } from "vitest";

vi.mock("../../src/contexts/EnvironmentContext", () => ({
  useEnvironmentCtx: vi.fn(),
}));

vi.mock("../../src/services/plantTypesApi", () => ({
  addPlantType: vi.fn(),
  getTypesByEnvironment: vi.fn(),
}));

const mockedUseEnvCtx = useEnvironmentCtx as unknown as ReturnType<
  typeof vi.fn
>;
const mockedAddPlantType = addPlantType as unknown as Mock;
const mockedGetTypes = getTypesByEnvironment as unknown as Mock;

describe("MyPlants - Add Type Creation", () => {
  it("adds a new plant type correctly", async () => {
    const mockSetPlantTypes = vi.fn();

    mockedUseEnvCtx.mockReturnValue({
      plantTypes: [],
      pots: [],
      loading: false,
      error: null,
      environmentName: "TestEnv",
      environmentID: "680f8359688cb5341f9f9c19",
      setPlantTypes: mockSetPlantTypes,
    });

    mockedAddPlantType.mockResolvedValueOnce({});
    mockedGetTypes.mockResolvedValueOnce([
      {
        _id: "abc123",
        name: "Basil",
        watering_frequency: 5,
        water_dosage: 100,
      },
    ]);

    render(
      <MemoryRouter>
        <MyPlants />
      </MemoryRouter>
    );

    // Open modal
    fireEvent.click(screen.getByText("Add new type"));

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Type/i), {
      target: { value: "Basil" },
    });
    fireEvent.change(screen.getByLabelText(/Watering Frequency/i), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText(/Dosage/i), {
      target: { value: "100" },
    });

    // Click continue
    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
      expect(mockedAddPlantType).toHaveBeenCalledWith(
        "680f8359688cb5341f9f9c19",
        {
          name: "Basil",
          watering_frequency: 5,
          water_dosage: 100,
        }
      );
    });

    await waitFor(() => {
      expect(mockedGetTypes).toHaveBeenCalled();
      expect(mockSetPlantTypes).toHaveBeenCalledWith([
        {
          _id: "abc123",
          name: "Basil",
          watering_frequency: 5,
          water_dosage: 100,
        },
      ]);
    });
  });
});
