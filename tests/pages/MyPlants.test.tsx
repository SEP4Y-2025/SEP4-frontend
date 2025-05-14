import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useEnvironmentCtx } from "../../src/contexts/EnvironmentContext";
import MyPlants from "../../src/pages/MyPlants";
import { vi, Mock, it, expect } from "vitest";
import { addPlantType, getTypesByEnvironment } from "../../src/services/plantTypesApi";

vi.mock("../../src/contexts/EnvironmentContext", () => ({
    useEnvironmentCtx: vi.fn(),
}));

vi.mock("../../src/services/plantTypesApi", () => ({
    addPlantType: vi.fn(),
    getTypesByEnvironment: vi.fn(),
}));

it("renders the page correctly", () => {
    (useEnvironmentCtx as Mock).mockReturnValue({
        plantTypes: [
            { _id: "1", name: "Basil", water_frequency: 5, water_dosage: 100 },
            { _id: "2", name: "Mint", water_frequency: 3, water_dosage: 50 },
        ],
        pots: [],
        environmentName: "Greenhouse",
        environmentId: "680f8359688cb5341f9f9c19",
        loading: false,
        error: null,
    });

    render(
        <MemoryRouter>
            <MyPlants />
        </MemoryRouter>
    );

    expect(screen.getByText("My Plants - Greenhouse")).toBeInTheDocument();
    expect(screen.getByText("Type: Basil (5x/week, 100ml)")).toBeInTheDocument();
    expect(screen.getByText("Type: Mint (3x/week, 50ml)")).toBeInTheDocument();
});

it("opens the modal when 'Add new type' is clicked", () => {
    (useEnvironmentCtx as Mock).mockReturnValue({
        plantTypes: [],
        pots: [],
        environmentName: "Greenhouse",
        loading: false,
        error: null,
    });

    render(
        <MemoryRouter>
            <MyPlants />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Add new type"));
    expect(screen.getByText("Add new Type")).toBeInTheDocument();
});

it("adds a new plant type correctly", async () => {
    (useEnvironmentCtx as Mock).mockReturnValue({
        plantTypes: [],
        pots: [],
        environmentName: "Greenhouse",
        environmentID: "680f8359688cb5341f9f9c19",
        loading: false,
        error: null,
        setPlantTypes: vi.fn(),
    });

    (getTypesByEnvironment as Mock).mockResolvedValueOnce([
        { _id: "1", name: "Basil", water_frequency: 5, water_dosage: 100 },
    ]);

    render(
        <MemoryRouter>
            <MyPlants />
        </MemoryRouter>
    );

    // Open modal
    fireEvent.click(screen.getByText("Add new type"));

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: "Basil" } });
    fireEvent.change(screen.getByLabelText(/Watering Frequency/i), { target: { value: "5" } });
    fireEvent.change(screen.getByLabelText(/Dosage/i), { target: { value: "100" } });

    // Submit the form
    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
        expect(addPlantType).toHaveBeenCalledWith("680f8359688cb5341f9f9c19", {
            name: "Basil",
            watering_frequency: 5,
            water_dosage: 100,
        });
        expect(getTypesByEnvironment).toHaveBeenCalledWith("680f8359688cb5341f9f9c19");
    });
});

// it("handles API errors when adding a new plant type", async () => {
//     (useEnvironmentCtx as Mock).mockReturnValue({
//         plantTypes: [],
//         pots: [],
//         environmentName: "Greenhouse",
//         loading: false,
//         error: null,
//         setPlantTypes: vi.fn(),
//     });

//     (addPlantType as Mock).mockRejectedValueOnce(new Error("Failed to add plant type"));

//     render(
//         <MemoryRouter>
//             <MyPlants />
//         </MemoryRouter>
//     );

//     // Open modal
//     fireEvent.click(screen.getByText("Add new type"));

//     // Fill out the form
//     fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: "Basil" } });
//     fireEvent.change(screen.getByLabelText(/Dosage/i), { target: { value: "100" } });

//     // Submit the form
//     fireEvent.click(screen.getByText("Continue"));

//     await waitFor(() => {
//         expect(screen.getByText("Failed to add plant type")).toBeInTheDocument();
//     });
// });