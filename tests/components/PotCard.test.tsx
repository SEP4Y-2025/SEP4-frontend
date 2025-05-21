import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import PotCard from "../../src/components/MyPlants/PotCard";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


describe("PotCard", () => {
  const mockProps = {
    id: "123",
    plantName: "Aloe Vera",
  };

  it("renders the plant name and icon", () => {
    render(
      <BrowserRouter>
        <PotCard {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("Aloe Vera")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Plant Icon" })).toBeInTheDocument();
  });

  it("navigates to the correct URL when clicked", async () => {
    render(
      <BrowserRouter>
        <PotCard {...mockProps} />
      </BrowserRouter>
    );

    const potCard = screen.getByText("Aloe Vera");
    await userEvent.click(potCard);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/plant-details/123",
      expect.anything()
    );
  });
});
