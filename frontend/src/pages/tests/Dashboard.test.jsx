import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../Dashboard";
import React from "react";

vi.mock("../../hooks/overviewPage/useOffersDataOverview", () => ({
    default: vi.fn(),
}));

vi.mock("../../components/Dashboard/FilterBar", () => ({
    default: () => <div data-testid="filter-bar" />,
}));

vi.mock("../../components/Dashboard/ChartSection", () => ({
    default: () => <div data-testid="chart-section" />,
}));

vi.mock("../../components/Dashboard/ChartSelector", () => ({
    default: ({ selectedChart, setSelectedChart }) => (
        <select
            data-testid="chart-selector"
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
        >
            <option value="offersPerSalesman">Salesman</option>
            <option value="offersPerCountry">Country</option>
        </select>
    ),
}));

vi.mock("../../components/Dashboard/Leaderboard", () => ({
    default: () => <div data-testid="leaderboard" />,
}));

vi.mock("../../components/Charts/SalesTrendChart", () => ({
    default: () => <div data-testid="trend-chart" />,
}));

vi.mock("../../components/Charts/ConversionsChart", () => ({
    default: () => <div data-testid="conversions-chart" />,
}));

vi.mock("../../components/Charts/TimeToSaleChart", () => ({
    default: () => <div data-testid="time-to-sale-chart" />,
}));

import useOffersDataOverview from "../../hooks/overviewPage/useOffersDataOverview";

describe("Dashboard Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("shows loading spinner", () => {
        useOffersDataOverview.mockReturnValue({
            loading: true,
            error: null,
            offers: [],
            filteredOffers: [],
            filters: {},
            setFilters: vi.fn(),
            options: {},
            applyFilters: vi.fn(),
        });

        render(<Dashboard />);

        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    test("shows error message", () => {
        useOffersDataOverview.mockReturnValue({
            loading: false,
            error: "Failed",
        });

        render(<Dashboard />);

        expect(screen.getByText(/Failed to load data/)).toBeInTheDocument();
    });

    test("renders full dashboard when data loads", () => {
        useOffersDataOverview.mockReturnValue({
            loading: false,
            error: null,
            offers: [{ id: 1, salesPersons: [{ name: "Anna" }] }],
            filteredOffers: [{ id: 1 }],
            filters: {},
            setFilters: vi.fn(),
            options: {},
            applyFilters: vi.fn(),
        });

        render(<Dashboard />);

        expect(screen.getByTestId("trend-chart")).toBeInTheDocument();
        expect(screen.getByTestId("conversions-chart")).toBeInTheDocument();
        expect(screen.getByTestId("time-to-sale-chart")).toBeInTheDocument();

        expect(screen.getByTestId("leaderboard")).toBeInTheDocument();

        expect(screen.getByTestId("filter-bar")).toBeInTheDocument();
        expect(screen.getByTestId("chart-section")).toBeInTheDocument();
        expect(screen.getByTestId("chart-selector")).toBeInTheDocument();
    });

    test("changes selected chart when selector changes", () => {
        useOffersDataOverview.mockReturnValue({
            loading: false,
            error: null,
            offers: [],
            filteredOffers: [],
            filters: {},
            setFilters: vi.fn(),
            options: {},
            applyFilters: vi.fn(),
        });

        render(<Dashboard />);

        const selector = screen.getByTestId("chart-selector");

        expect(selector.value).toBe("offersPerSalesman");

        fireEvent.change(selector, { target: { value: "offersPerCountry" } });

        expect(selector.value).toBe("offersPerCountry");
    });

    test("matches snapshot when data loads", () => {
        useOffersDataOverview.mockReturnValue({
            loading: false,
            error: null,
            offers: [{ id: 1, salesPersons: [{ name: "Anna" }] }],
            filteredOffers: [{ id: 1 }],
            filters: {},
            setFilters: vi.fn(),
            options: {},
            applyFilters: vi.fn(),
        });

        const { container } = render(<Dashboard />);
        expect(container).toMatchSnapshot();
    });
});