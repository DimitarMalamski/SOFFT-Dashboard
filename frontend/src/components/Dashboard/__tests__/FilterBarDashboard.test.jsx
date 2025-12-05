import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import FilterBarDashboard from "../FilterBarDashboard.jsx";

vi.mock("react-datepicker", () => ({
    default: ({ selected, onChange }) => (
        <input
            data-testid="mock-datepicker"
            value={selected || ""}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}));

describe("FilterBarDashboard Component", () => {

    const mockFilters = {
        dateRange: "",
        startDate: null,
        endDate: null,
        salesmen: [],
        countries: [],
        productTypes: [],
        brands: [],
        incoterms: [],
    };

    const mockOptions = {
        salesmen: ["Alice", "Bob"],
        countries: ["Germany", "France"],
        productTypes: ["Truck", "Trailer"],
        brands: ["Volvo", "MAN"],
        incoterms: ["FOB", "CIF"],
    };

    const setFilters = vi.fn();
    const applyFilters = vi.fn();
    const resetFilters = vi.fn();

    beforeEach(() => vi.clearAllMocks());

    test("renders all labels and Apply button", () => {
        render(
            <FilterBarDashboard
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
                resetFilter={resetFilters}
            />
        );

        expect(screen.getByText("Date Range")).toBeInTheDocument();
        expect(screen.getByText("Salesmen")).toBeInTheDocument();
        expect(screen.getByText("Country")).toBeInTheDocument();
        expect(screen.getByText("Vehicle Type")).toBeInTheDocument();
        expect(screen.getByText("Brand")).toBeInTheDocument();
        expect(screen.getByText("Incoterm")).toBeInTheDocument();
        expect(screen.getByText("Apply")).toBeInTheDocument();
    });

    test("opens a dropdown and shows its options", () => {
        render(
            <FilterBarDashboard
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
                resetFilter={resetFilters}
            />
        );

        // Find the Salesmen label
        const label = screen.getByText("Salesmen");

        // The dropdown button is the next sibling
        const dropdownButton = label.parentElement.querySelector("button");

        // Open it
        fireEvent.click(dropdownButton);

        // Now options should exist
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    test("selecting a value updates filters", () => {
        render(
            <FilterBarDashboard
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
                resetFilter={resetFilters}
            />
        );

        // open Country dropdown
        const countryButton = screen.getByText("Country").parentElement.querySelector("button");
        fireEvent.click(countryButton);

        // click on Germany
        fireEvent.click(screen.getByText("Germany"));

        expect(setFilters).toHaveBeenCalled();
        const update = setFilters.mock.calls[0][0];
        expect(update).toEqual(expect.any(Function)); // since CompactMultiSelect uses functional updates
    });

    test("Date Range: selecting 'Custom' reveals date inputs", () => {
        render(
            <FilterBarDashboard
                filters={{ ...mockFilters, dateRange: "custom" }}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
                resetFilter={resetFilters}
            />
        );

        expect(screen.getAllByTestId("mock-datepicker").length).toBe(2);
    });

    test("Apply button triggers applyFilters", () => {
        render(
            <FilterBarDashboard
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
                resetFilter={resetFilters}
            />
        );

        fireEvent.click(screen.getByText("Apply"));

        expect(applyFilters).toHaveBeenCalled();
    });

    test("toggle collapses and expands the filter panel", () => {
        render(
            <FilterBarDashboard
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
                resetFilter={resetFilters}
            />
        );

        const toggle = screen.getByText("Filters").parentElement;

        const collapsible = toggle.nextElementSibling;

        fireEvent.click(toggle);
        expect(collapsible).toHaveClass("opacity-0");

        fireEvent.click(toggle);
        expect(collapsible).toHaveClass("opacity-100");
    });

    test("Vehicle Type dropdown opens and allows selection", () => {
        render(
            <FilterBarDashboard
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
                resetFilter={resetFilters}
            />
        );

        const label = screen.getByText("Vehicle Type");
        const dropdownButton = label.parentElement.querySelector("button");

        fireEvent.click(dropdownButton);

        fireEvent.click(screen.getByText("Truck"));

        expect(setFilters).toHaveBeenCalled();
    });

    test("Brand and Incoterm dropdowns work", () => {
        render(
            <FilterBarDashboard
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
                resetFilter={resetFilters}
            />
        );

        const brandBtn = screen.getByText("Brand").parentElement.querySelector("button");
        fireEvent.click(brandBtn);
        fireEvent.click(screen.getByText("Volvo"));
        expect(setFilters).toHaveBeenCalled();

        const incotermBtn = screen.getByText("Incoterm").parentElement.querySelector("button");
        fireEvent.click(incotermBtn);
        fireEvent.click(screen.getByText("FOB"));
        expect(setFilters).toHaveBeenCalled();
    });

    test("Reset button triggers resetFilter callback", () => {
        render(
            <FilterBarDashboard
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
                resetFilter={resetFilters}
            />
        );

        fireEvent.click(screen.getByText("Reset"));

        expect(resetFilters).toHaveBeenCalled();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <FilterBarDashboard
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
                resetFilter={resetFilters}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
