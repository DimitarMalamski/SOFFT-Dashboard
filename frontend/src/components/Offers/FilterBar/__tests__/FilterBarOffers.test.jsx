import { render, screen, fireEvent } from "@testing-library/react";
import FilterBarOffers from "../FilterBarOffers.jsx";
import * as hook from "../../../../hooks/offersPage/useOfferFilters.js";

describe("FilterBarDashboard Component", () => {
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
        render(<FilterBarOffers offers={[]} onFilterChange={vi.fn()} />);

        expect(screen.getByText("Statuses")).toBeInTheDocument();
        expect(screen.getByText("Salespersons")).toBeInTheDocument();
        expect(screen.getByText("Depots")).toBeInTheDocument();

        expect(screen.getAllByText("All")).toHaveLength(3);

        fireEvent.click(screen.getAllByText("All")[0]);

        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Declined")).toBeInTheDocument();
    });

    test("calls handleChange when a dropdown option is clicked", () => {
        render(<FilterBarOffers offers={[]} onFilterChange={vi.fn()} />);

        fireEvent.click(screen.getAllByText("All")[0]);

        fireEvent.click(screen.getByLabelText("Pending"));

        expect(mockHandleChange).toHaveBeenCalledWith("statuses", ["Pending"]);
    });

    test("shows and triggers reset button", () => {
        render(<FilterBarOffers offers={[]} onFilterChange={vi.fn()} />);

        const resetButton = screen.getByRole("button", { name: /reset/i });
        expect(resetButton).toBeInTheDocument();

        fireEvent.click(resetButton);
        expect(mockHandleReset).toHaveBeenCalled();
    });

    test("opens all dropdowns independently", () => {
        render(<FilterBarOffers offers={[]} onFilterChange={vi.fn()} />);

        const [_, salespersons, depots] = screen.getAllByText("All");

        fireEvent.click(salespersons);
        expect(screen.getByText("Anna")).toBeInTheDocument();
        expect(screen.getByText("Ben")).toBeInTheDocument();

        fireEvent.click(depots);
        expect(screen.getByText("North Hub")).toBeInTheDocument();
        expect(screen.getByText("South Hub")).toBeInTheDocument();
    });

    test("calls handleChange for salespersons filter", () => {
        render(<FilterBarOffers offers={[]} onFilterChange={vi.fn()} />);

        fireEvent.click(screen.getAllByText("All")[1]); // Salespersons dropdown
        fireEvent.click(screen.getByLabelText("Anna"));

        expect(mockHandleChange).toHaveBeenCalledWith("salespersons", ["Anna"]);
    });

    test("calls handleChange for depots filter", () => {
        render(<FilterBarOffers offers={[]} onFilterChange={vi.fn()} />);

        fireEvent.click(screen.getAllByText("All")[2]);
        fireEvent.click(screen.getByLabelText("North Hub"));

        expect(mockHandleChange).toHaveBeenCalledWith("depots", ["North Hub"]);
    });

    test("passes correct props to all dropdowns", () => {
        render(<FilterBarOffers offers={[]} onFilterChange={vi.fn()} />);

        const dropdowns = screen.getAllByText("All");

        expect(dropdowns.length).toBe(3);

        expect(screen.getByText("Statuses")).toBeInTheDocument();
        expect(screen.getByText("Salespersons")).toBeInTheDocument();
        expect(screen.getByText("Depots")).toBeInTheDocument();
    });

    test("reset button includes RotateCcw icon", () => {
        render(<FilterBarOffers offers={[]} onFilterChange={vi.fn()} />);

        const resetButton = screen.getByRole("button", { name: /reset/i });
        expect(resetButton.querySelector("svg")).not.toBeNull();
    });

    test("does not show reset button when no active filters", () => {
        vi.spyOn(hook, "useOfferFilters").mockReturnValue({
            filters: { statuses: [], salespersons: [], depots: [] },
            options: { statuses: [], salespeople: [], depots: [] },
            handleChange: vi.fn(),
            handleReset: vi.fn(),
            hasActiveFilters: false,
        });

        render(<FilterBarOffers offers={[]} onFilterChange={vi.fn()} />);

        expect(screen.queryByRole("button", { name: /reset/i })).toBeNull();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <FilterBarOffers offers={[]} onFilterChange={vi.fn()} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
