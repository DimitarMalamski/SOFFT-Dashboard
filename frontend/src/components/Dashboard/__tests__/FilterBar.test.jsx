import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import FilterBar from "../FilterBar.jsx";

vi.mock("react-datepicker", () => ({
    default: ({ selected, onChange }) => (
        <input
            data-testid="mock-datepicker"
            value={selected || ""}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}));

describe("Overview FilterBar Component", () => {

    const mockFilters = {
        startDate: "",
        endDate: "",
        country: "",
        productType: "",
        brand: "",
        salesman: "",
        incoterm: "",
    };

    const mockOptions = {
        countries: ["Germany", "France"],
        productTypes: ["Truck", "Trailer"],
        brands: ["Volvo", "MAN"],
        salesmen: ["Alice", "Bob"],
        incoterms: ["FOB", "CIF"],
    };

    const setFilters = vi.fn();
    const applyFilters = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders all dropdowns and Apply button", () => {
        render(
            <FilterBar
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
            />
        );

        expect(screen.getByText("Apply")).toBeInTheDocument();
        expect(screen.getByText("All Countries")).toBeInTheDocument();
        expect(screen.getByText("All Types")).toBeInTheDocument();
        expect(screen.getByText("All Brands")).toBeInTheDocument();
        expect(screen.getByText("All Salesmen")).toBeInTheDocument();
        expect(screen.getByText("All Incoterms")).toBeInTheDocument();
    });

    test("renders the correct options", () => {
        render(
            <FilterBar
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
            />
        );

        expect(screen.getByText("Germany")).toBeInTheDocument();
        expect(screen.getByText("France")).toBeInTheDocument();
        expect(screen.getByText("Truck")).toBeInTheDocument();
        expect(screen.getByText("Trailer")).toBeInTheDocument();
        expect(screen.getByText("Volvo")).toBeInTheDocument();
        expect(screen.getByText("MAN")).toBeInTheDocument();
    });

    test("calls setFilters when changing a dropdown", () => {
        render(
            <FilterBar
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
            />
        );

        const selects = screen.getAllByRole("combobox");
        const countrySelect = selects[0];

        fireEvent.change(countrySelect, { target: { value: "Germany" }});

        expect(setFilters).toHaveBeenCalled();
        expect(setFilters.mock.calls[0][0].country).toBe("Germany");
    });

    test("brand dropdown is disabled when no product type and no brands", () => {
        const mockEmptyOptions = { ...mockOptions, brands: [] };

        render(
            <FilterBar
                filters={{ ...mockFilters, productType: "" }}
                setFilters={setFilters}
                options={mockEmptyOptions}
                applyFilters={applyFilters}
            />
        );

        const brandSelect = screen.getByText("All Brands").closest("select");
        expect(brandSelect).toBeDisabled();
    });

    test("Apply button triggers applyFilters", () => {
        render(
            <FilterBar
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
            />
        );

        const applyButton = screen.getByRole("button", { name: "Apply" });

        fireEvent.click(applyButton);

        expect(applyFilters).toHaveBeenCalled();
    });

    test("sets startDate and endDate when datepicker changes", () => {
        render(
            <FilterBar
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
            />
        );

        const datepickers = screen.getAllByTestId("mock-datepicker");

        fireEvent.change(datepickers[0], { target: { value: "2025-01-01" } });
        fireEvent.change(datepickers[1], { target: { value: "2025-01-31" } });

        expect(setFilters).toHaveBeenCalledTimes(2);
        expect(setFilters.mock.calls[0][0].startDate).toBe("2025-01-01");
        expect(setFilters.mock.calls[1][0].endDate).toBe("2025-01-31");
    });

    test("enables brand dropdown when a product type is selected", () => {
        render(
            <FilterBar
                filters={{ ...mockFilters, productType: "Truck" }}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
            />
        );

        const brandSelect = screen.getByText("All Brands").closest("select");
        expect(brandSelect).not.toBeDisabled();
    });

    test("changes incoterm dropdown value and triggers setFilters", () => {
        render(
            <FilterBar
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
            />
        );

        const incotermSelect = screen.getByText("All Incoterms").closest("select");

        fireEvent.change(incotermSelect, { target: { value: "CIF" } });

        expect(setFilters).toHaveBeenCalled();
        expect(setFilters.mock.calls[0][0].incoterm).toBe("CIF");
    });

    test("Apply button triggers applyFilters with current filter values", () => {
        const filters = { ...mockFilters, country: "Germany", productType: "Truck" };

        render(
            <FilterBar
                filters={filters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: "Apply" }));

        expect(applyFilters).toHaveBeenCalled();
    });

    test("does not crash with empty props", () => {
        render(
            <FilterBar
                filters={{}}
                setFilters={() => {}}
                options={{ countries: [], productTypes: [], brands: [], salesmen: [], incoterms: [] }}
                applyFilters={() => {}}
            />
        );

        expect(screen.getByText("Apply")).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <FilterBar
                filters={mockFilters}
                setFilters={setFilters}
                options={mockOptions}
                applyFilters={applyFilters}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });

});
