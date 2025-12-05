import { render, screen, fireEvent } from "@testing-library/react";
import SalesFilters from "../SalesFilters.jsx";

describe("SalesFilters Component", () => {
    const mockSales = [
        {
            status: "Pending",
            salesPersons: [{ name: "Anna Stevenson" }],
            depotName: "North Hub",
        },
        {
            status: "Approved",
            salesPersons: [{ name: "John Smith" }],
            depotName: "London Storage",
        },
    ];

    const defaultFilters = {
        status: "All",
        salespersons: [],
        depots: [],
    };

    const setFilters = vi.fn();
    const resetFilters = vi.fn();

    beforeEach(() => {
        setFilters.mockClear();
        resetFilters.mockClear();
    });

    test("renders status dropdown with unique options", () => {
        render(
            <SalesFilters
                filters={defaultFilters}
                setFilters={setFilters}
                sales={mockSales}
                resetFilters={resetFilters}
            />
        );

        const statusBox = screen.getByTestId("status-dropdown");
        expect(statusBox).toBeInTheDocument();

        fireEvent.click(statusBox);
        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Approved")).toBeInTheDocument();
    });

    test("fires setFilters when changing status", () => {
        render(
            <SalesFilters
                filters={defaultFilters}
                setFilters={setFilters}
                sales={mockSales}
                resetFilters={resetFilters}
            />
        );

        const statusBox = screen.getByTestId("status-dropdown");
        fireEvent.click(statusBox);

        const checkboxLabel = screen.getByText("Pending").closest("label");
        fireEvent.click(checkboxLabel);

        expect(setFilters).toHaveBeenCalledTimes(1);
        expect(typeof setFilters.mock.calls[0][0]).toBe("function");
    });

    test("opens salesperson dropdown", () => {
        render(
            <SalesFilters
                filters={defaultFilters}
                setFilters={setFilters}
                sales={mockSales}
                resetFilters={resetFilters}
            />
        );

        const label = screen.getByText("Salesperson");

        const dropdownButton = label.parentElement.querySelector("div.cursor-pointer");

        fireEvent.click(dropdownButton);

        expect(screen.getByText("Anna Stevenson")).toBeInTheDocument();
        expect(screen.getByText("John Smith")).toBeInTheDocument();
    });

    test("calls setFilters when selecting salesperson", () => {
        render(
            <SalesFilters
                filters={defaultFilters}
                setFilters={setFilters}
                sales={mockSales}
                resetFilters={resetFilters}
            />
        );

        const label = screen.getByText("Salesperson");
        const dropdownButton = label.parentElement.querySelector("div.cursor-pointer");

        fireEvent.click(dropdownButton);

        const checkbox = screen.getByLabelText("Anna Stevenson");
        fireEvent.click(checkbox);

        expect(setFilters).toHaveBeenCalledTimes(1);
    });

    test("calls resetFilters when reset button clicked", () => {
        render(
            <SalesFilters
                filters={defaultFilters}
                setFilters={setFilters}
                sales={mockSales}
                resetFilters={resetFilters}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /reset/i }));

        expect(resetFilters).toHaveBeenCalledTimes(1);
    });
});
