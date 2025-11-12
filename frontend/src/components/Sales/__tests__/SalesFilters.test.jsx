import { render, screen, fireEvent } from "@testing-library/react";
import SalesFilters from "../SalesFilters.jsx";

describe("SalesFilters Component", () => {
    const mockSales = [
        {
            status: "Pending",
            salesPersonName: [{ name: "Anna Svensson" }],
            depotName: "North Hub",
        },
        {
            status: "Approved",
            salesPersonName: [{ name: "John Smith" }],
            depotName: "London Storage",
        },
    ];

    const defaultFilters = {
        status: "All",
        salesperson: "All",
        depot: "All"
    };

    const setFilters = vi.fn();
    const applyFilters = vi.fn();
    const resetFilters = vi.fn();

    beforeEach(() => {
        setFilters.mockClear();
        applyFilters.mockClear();
        resetFilters.mockClear();
    });

    test("match snapshot", () => {
        const { asFragment } = render(
            <SalesFilters
                filters={{ status: "All", salesperson: "All", depot: "All" }}
                setFilters={vi.fn()}
                sales={[]}
                applyFilters={vi.fn()}
                resetFilters={vi.fn()}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    })

    test("renders dropdowns with unique options", () => {
        render(
            <SalesFilters
                filters={defaultFilters}
                setFilters={setFilters}
                sales={mockSales}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
            />
        );

        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Approved")).toBeInTheDocument();

        expect(screen.getByText("Anna Svensson")).toBeInTheDocument();
        expect(screen.getByText("John Smith")).toBeInTheDocument();

        expect(screen.getByText("North Hub")).toBeInTheDocument();
        expect(screen.getByText("London Storage")).toBeInTheDocument();
    });

    test("calls setFilters when selecting a status", () => {
        render(
            <SalesFilters
                filters={defaultFilters}
                setFilters={setFilters}
                sales={mockSales}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
            />
        );

        const statusSelect = screen.getByLabelText(/Status/i);
        fireEvent.change(statusSelect, {
            target: {
                value: "Pending"
            }
        });

        expect(setFilters).toHaveBeenCalledTimes(1);
        expect(typeof setFilters.mock.calls[0][0]).toBe("function");
    });

    test("calls resetFilters when reset button clicked", () => {
        render(
            <SalesFilters
                filters={defaultFilters}
                setFilters={setFilters}
                sales={mockSales}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
            />
        );

        const resetButton = screen.getByRole("button", {
            name: /reset/i
        });

        fireEvent.click(resetButton);

        expect(resetFilters).toHaveBeenCalledTimes(1);
    });
});