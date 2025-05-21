import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MyPlants from "../../src/pages/MyPlants";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

vi.mock("../../src/contexts/EnvironmentContext", () => ({
  useEnvironmentCtx: () => ({
    environmentID: "env123",
    environmentName: "Test Garden",
    isOwner: true,
  }),
}));

vi.mock("../../src/contexts/UserAuthContext", () => ({
  useAuth: () => ({
    user: { uid: "user123" },
  }),
}));

vi.mock("../../src/hooks/pots/useGetPotsByEnvironment", () => ({
  useGetPotsByEnvironment: () => ({
    pots: [
      {
        pot_id: "pot1",
        label: "Pot 1",
        plant_type_id: "type1",
      },
    ],
    loadingPots: false,
    fetchPots: vi.fn(),
  }),
}));

vi.mock("../../src/hooks/pots/useGetTypesByEnvironment", () => ({
  useGetTypesByEnvironment: () => ({
    types: [
      {
        _id: "type1",
        name: "Tomato",
        watering_frequency: 3,
        water_dosage: 500,
      },
    ],
    loadingTypes: false,
    fetchTypes: vi.fn(),
  }),
}));

const mockAddPlantType = vi.fn();
vi.mock("../../src/hooks/pots/useAddPlantType", () => ({
  useAddPlantType: () => ({
    addPlantType: mockAddPlantType,
  }),
}));

const mockDeleteEnvironment = vi.fn();
vi.mock("../../src/hooks/environments/useDeleteEnvironment", () => ({
  useDeleteEnvironment: () => ({
    deleteEnvironment: mockDeleteEnvironment,
  }),
}));

vi.mock("../../src/components/MyPlants/PlantTypeRow", () => ({
  default: (props: any) => (
    <div data-testid="plant-row">{props.plant.name}</div>
  ),
}));

vi.mock("../../src/components/MyPlants/AddPlantTypeModal", () => ({
  default: (props: any) => (
    <div data-testid="add-modal">
      <button onClick={props.handleContinue}>Continue</button>
      <button onClick={props.handleCancel}>Cancel</button>
    </div>
  ),
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("MyPlants (Vitest)", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <MyPlants />
      </BrowserRouter>
    );

  beforeEach(() => {
    mockAddPlantType.mockReset();
    mockDeleteEnvironment.mockReset();
    mockDeleteEnvironment.mockResolvedValue({ success: true });
  });

  it("renders environment title", () => {
    setup();
    expect(screen.getByText("My Plants - Test Garden")).toBeInTheDocument();
  });

  it("renders plant types", () => {
    setup();
    expect(screen.getByTestId("plant-row")).toHaveTextContent("Tomato");
  });

  it("opens and closes AddPlantTypeModal", async () => {
    setup();
    fireEvent.click(screen.getByText("Add new type"));
    expect(screen.getByTestId("add-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() =>
      expect(screen.queryByTestId("add-modal")).not.toBeInTheDocument()
    );
  });

  it("confirms and calls deleteEnvironment", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    setup();

    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() =>
      expect(mockDeleteEnvironment).toHaveBeenCalledWith("env123")
    );
  });

  it("does not call deleteEnvironment if confirmation is cancelled", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    setup();

    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => expect(mockDeleteEnvironment).not.toHaveBeenCalled());
  });
});
