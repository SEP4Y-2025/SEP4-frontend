import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import PlantTypeRow, { PlantTypeRowProps } from "../../src/components/MyPlants/PlantTypeRow";
import "@testing-library/jest-dom";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("PlantTypeRow", () => {
  const mockProps: PlantTypeRowProps = {
    plant: {
      _id: "1",
      name: "Cactus",
      water_frequency: 1,
      water_dosage: 100,
    },
    pots: [
      { id: "1", potName: "Pot 1" },
      { id: "2", potName: "Pot 2" },
    ],
  };

  it("renders the plant type title and pots", () => {
    render(
      <BrowserRouter>
        <PlantTypeRow {...mockProps} />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Type: Cactus \(1x\/week, 100ml\)/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Pot 1")).toBeInTheDocument();
    expect(screen.getByText("Pot 2")).toBeInTheDocument();
  });

  it("navigates to the add plant page when the '+' button is clicked", async () => {
    render(
      <BrowserRouter>
        <PlantTypeRow {...mockProps} />
      </BrowserRouter>
    );

    const addButton = screen.getByRole("button", { name: "Add plant" });
    await userEvent.click(addButton);

    expect(mockNavigate).toHaveBeenCalledWith("/addplant/Cactus");
  });
});