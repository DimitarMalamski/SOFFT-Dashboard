import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../FilterBar.jsx";
import * as hook from "../../../../hooks/offersPage/useOfferFilters.js";

describe("FilterBar Component", () => {
    const mockHandleChange = vi.fn();
    const mockHandleReset = vi.fn();

    beforeEach(() => {
        vi.spyOn(hook, "useOfferFilters").mockReturnValue({
            filters: { statuses: [], salespersons: [], depots: [] },
            options: {
                statuses: ["Pending", "Declined"],
                salespeople: ["Anna", "Ben"],
                depots: ["North Hub", "South Hub"],
            },
            handleChange: mockHandleChange,
            handleReset: mockHandleReset,
            hasActiveFilters: true,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders dropdowns with correct options", () => {
        render(<FilterBar offers={[]} onFilterChange={vi.fn()} />);

        expect(screen.getByText("Statuses")).toBeInTheDocument();
        expect(screen.getByText("Salespersons")).toBeInTheDocument();
        expect(screen.getByText("Depots")).toBeInTheDocument();

        expect(screen.getAllByText("All")).toHaveLength(3);

        fireEvent.click(screen.getAllByText("All")[0]);

        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Declined")).toBeInTheDocument();
    });

    test("calls handleChange when a dropdown option is clicked", () => {
        render(<FilterBar offers={[]} onFilterChange={vi.fn()} />);

        fireEvent.click(screen.getAllByText("All")[0]);

        fireEvent.click(screen.getByLabelText("Pending"));

        expect(mockHandleChange).toHaveBeenCalledWith("statuses", ["Pending"]);
    });

    test("shows and triggers reset button", () => {
        render(<FilterBar offers={[]} onFilterChange={vi.fn()} />);

        const resetButton = screen.getByRole("button", { name: /reset/i });
        expect(resetButton).toBeInTheDocument();

        fireEvent.click(resetButton);
        expect(mockHandleReset).toHaveBeenCalled();
    });

    test("does not show reset button when no active filters", () => {
        vi.spyOn(hook, "useOfferFilters").mockReturnValue({
            filters: { statuses: [], salespersons: [], depots: [] },
            options: { statuses: [], salespeople: [], depots: [] },
            handleChange: vi.fn(),
            handleReset: vi.fn(),
            hasActiveFilters: false,
        });

        render(<FilterBar offers={[]} onFilterChange={vi.fn()} />);

        expect(screen.queryByRole("button", { name: /reset/i })).toBeNull();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <FilterBar offers={[]} onFilterChange={vi.fn()} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
