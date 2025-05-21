import React from "react";
import { render, screen } from "@testing-library/react";
import PlantDetails from "../../src/pages/PlantDetails";
import * as potHooks from "../../src/hooks/pots/useGetPotById";
import * as plantTypeHooks from "../../src/hooks/useGetPlantTypeById";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockPot = {
  pot_id: "some-id",
  label: "Test Plant",
  plant_type_id: "plant-type-id",
  environment_id: "env-id",
  watering_frequency: 3,
  water_dosage: 500,
  state: {
    temperature: 22,
    soil_humidity: 50,
    air_humidity: 40,
    light_intensity: 70,
    water_level: 50,
    water_tank_capacity: 1000,
    measured_at: new Date().toISOString(),
  },
};

const mockType = {
  plant_type_id: "plant-type-id",
  name: "Ficus ▼",
  watering_frequency: 3,
  water_dosage: 500,
};

describe("PlantDetails component", () => {
  beforeEach(() => {
    vi.spyOn(potHooks, "useGetPotById").mockReturnValue({
      pot: mockPot,
      isLoading: false,
      error: null,
    });

    vi.spyOn(plantTypeHooks, "useGetPlantTypeById").mockReturnValue({
      plantType: mockType,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders plant details correctly", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<PlantDetails />);

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    expect(
      screen.getByText((content) => content.includes("Plant Details"))
    ).toBeDefined();

    expect(screen.getByText("Test Plant")).toBeDefined();

    expect(screen.getByText("Ficus ▼")).toBeDefined();

    expect(
      screen.getByText(`Every ${mockType.watering_frequency} days`)
    ).toBeDefined();

    expect(screen.getByText("1000")).toBeDefined();

    expect(screen.getByTestId("temperature").textContent).toBe("22°C");
    expect(screen.getByTestId("soil-humidity").textContent).toBe("50%");
    expect(screen.getByTestId("air-humidity").textContent).toBe("40%");
    expect(screen.getByTestId("light-intensity").textContent).toBe("70%");

    consoleErrorSpy.mockRestore();
  });

  it("shows error if pot not found", () => {
    vi.spyOn(potHooks, "useGetPotById").mockReturnValue({
      pot: null,
      isLoading: false,
      error: null,
    });

    render(<PlantDetails />);
    expect(screen.getByText("Pot not found")).toBeDefined();
  });
});
