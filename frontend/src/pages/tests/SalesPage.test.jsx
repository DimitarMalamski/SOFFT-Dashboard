import { render, screen, fireEvent } from "@testing-library/react";
import SalesPage from "../Sales.jsx";
import * as useSalesDataHook from "../../hooks/salesPage/useSalesData.js";

describe("SalesPage Integration Test", () => {
    const mockData = [
        {
            uuid: "so1",
            referenceId: "OFFER-SE-001",
            customerCompanyName: "Nordic Trucks AB",
            salesPersons: [{ name: "Anna Svensson" }],
            depotName: "North Hub",
            status: "Pending",
            totalPrice: 85000,
            discount: 0,
            currency: "EUR",
            createdAt: "2025-11-10T11:37:32.58",
            expiresAt: null,
        },
        {
            uuid: "so2",
            referenceId: "OFFER-GB-002",
            customerCompanyName: "EuroTransport Ltd",
            salesPersons: [{ name: "John Smith" }],
            depotName: "London Storage",
            status: "Approved",
            totalPrice: 120000,
            discount: 500,
            currency: "GBP",
            createdAt: "2025-11-10T11:37:32.58",
            expiresAt: null,
        },
    ];

    beforeEach(() => {
        vi.spyOn(useSalesDataHook, "useSalesData").mockReturnValue({
            sales: mockData,
            filtered: mockData,
            filters: { status: "All" , salespersons: [], depots: [] },
            setFilters: vi.fn(),
            applyFilters: vi.fn(),
            resetFilters: vi.fn(),
            loading: false,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders main sections correctly", () => {
        render(
            <SalesPage />
        );

        // Core components
        expect(screen.getByText(/Sales by Salesperson/i)).toBeInTheDocument();
        expect(screen.getByText(/Sales by Depot/i)).toBeInTheDocument();
        expect(screen.getByText(/Reference ID/i)).toBeInTheDocument();

        // Table rows
        expect(screen.getByText(/OFFER-SE-001/)).toBeInTheDocument();
        expect(screen.getByText(/OFFER-GB-002/)).toBeInTheDocument();
    });

    test("renders loading state", () => {
        vi.spyOn(useSalesDataHook, "useSalesData").mockReturnValue({
            sales: [],
            filtered: [],
            filters: { status: "All" , salespersons: [], depots: [] },
            setFilters: vi.fn(),
            applyFilters: vi.fn(),
            resetFilters: vi.fn(),
            loading: true,
        });

        render(
            <SalesPage />
        );

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("filters sales by status", async () => {
        const setFilters = vi.fn();

        vi.spyOn(useSalesDataHook, "useSalesData").mockReturnValue({
            sales: mockData,
            filtered: mockData,
            filters: { status: "All" , salespersons: [], depots: [] },
            setFilters,
            resetFilters: vi.fn(),
            loading: false,
        });

        render(
            <SalesPage />
        );

        const statusBox = screen.getByTestId("status-dropdown");
        fireEvent.click(statusBox); // opens dropdown

        const approvedOption = await screen.findByLabelText("Approved");
        fireEvent.click(approvedOption);

        expect(setFilters).toHaveBeenCalledTimes(1);
    });

    test("shows empty state when no sales are found", () => {
        vi.spyOn(useSalesDataHook, "useSalesData").mockReturnValue({
            sales: [],
            filtered: [],
            filters: { status: "All" , salespersons: [], depots: [] },
            setFilters: vi.fn(),
            applyFilters: vi.fn(),
            resetFilters: vi.fn(),
            loading: false,
        });

        render(
            <SalesPage />
        );

        expect(screen.getByText(/No sales data available/i)).toBeInTheDocument();
    });

    test("renders error state when data fetching fails", () => {
        vi.spyOn(useSalesDataHook, "useSalesData").mockReturnValue({
            sales: [],
            filtered: [],
            filters: { status: "All" , salespersons: [], depots: [] },
            setFilters: vi.fn(),
            applyFilters: vi.fn(),
            resetFilters: vi.fn(),
            loading: false,
            error: new Error("Network error"),
        });

        render(<SalesPage />);
        expect(screen.getByText(/Failed to load sales data/i)).toBeInTheDocument();
    });

    test("handles pagination controls", async () => {
        render(
            <SalesPage />
        );

        const nextBtn = screen.getByText(/Next/i);
        expect(nextBtn).toBeDisabled();
    });

    test("renders both charts without errors", () => {
        render(
            <SalesPage />
        );

        expect(screen.getByText(/Sales by Salesperson/i)).toBeInTheDocument();
        expect(screen.getByText(/Sales by Depot/i)).toBeInTheDocument();
    })

    test("match snapshot", () => {
        const { asFragment } = render(
            <SalesPage />
        );

        expect(asFragment()).toMatchSnapshot();
    })
});