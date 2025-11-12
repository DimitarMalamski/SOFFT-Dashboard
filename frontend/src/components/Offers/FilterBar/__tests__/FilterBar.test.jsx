import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../FilterBar.jsx";
import * as hook from "../../../../hooks/useOfferFilters.js";

describe("FilterBar Component", () => {
    const mockHandleChange = vi.fn();
    const mockHandleReset = vi.fn();

    beforeEach(() => {
        vi.spyOn(hook, "useOfferFilters").mockReturnValue({
            filters: { status: "", salesperson: "", depot: "" },
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
        render(
            <FilterBar offers={[]} onFilterChange={vi.fn()}
        />);

        expect(screen.getByText("All statuses")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Declined")).toBeInTheDocument();

        expect(screen.getByText("All salespersons")).toBeInTheDocument();
        expect(screen.getByText("Anna")).toBeInTheDocument();
        expect(screen.getByText("Ben")).toBeInTheDocument();

        expect(screen.getByText("All depots")).toBeInTheDocument();
        expect(screen.getByText("North Hub")).toBeInTheDocument();
        expect(screen.getByText("South Hub")).toBeInTheDocument();
    });

    test("calls handleChange when a dropdown value changes", () => {
        render(
            <FilterBar offers={[]} onFilterChange={vi.fn()}
        />);

        const selects = screen.getAllByRole("combobox");
        fireEvent.change(selects[0], { target: { value: "Pending" } });

        expect(mockHandleChange).toHaveBeenCalled();
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
            filters: { status: "", salesperson: "", depot: "" },
            options: { statuses: [], salespeople: [], depots: [] },
            handleChange: vi.fn(),
            handleReset: vi.fn(),
            hasActiveFilters: false,
        });

        render(
            <FilterBar offers={[]} onFilterChange={vi.fn()}
        />);

        expect(screen.queryByRole("button", { name: /reset/i })).toBeNull();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <FilterBar offers={[]} onFilterChange={vi.fn()}
        />);

        expect(asFragment()).toMatchSnapshot();
    });
});
