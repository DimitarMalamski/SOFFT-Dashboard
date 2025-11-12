import { render, screen, fireEvent } from "@testing-library/react";
import OffersPage from "../Offers.jsx";
import * as useOffersDataHook from "../../hooks/useOffersData.js";

vi.mock("../../components/Offers/StatsBar/StatsBar.jsx", () => ({
    default: () => <div data-testid="stats-bar" />,
}));
vi.mock("../../components/Offers/ChartsSection/ChartsSection.jsx", () => ({
    default: () => <div data-testid="charts-section" />,
}));
vi.mock("../../components/Offers/OffersGrid/OffersGrid.jsx", () => ({
    default: () => <div data-testid="offers-grid" />,
}));
vi.mock("../../components/Offers/FilterBar/FilterBar.jsx", () => ({
    default: () => <div data-testid="filter-bar" />,
}));
vi.mock("../../components/Offers/FilterBar/LayoutButton.jsx", () => ({
    default: ({ title, onClick, active }) => (
        <button
            data-testid={title}
            data-active={active}
            onClick={onClick}
        >
            {title}
        </button>
    ),
}));

describe("OffersPage Component", () => {
    const baseHookData = {
        offers: [{ uuid: "1" }],
        filteredOffers: [{ uuid: "1" }],
        setFilters: vi.fn(),
        loading: false,
        error: null,
    };

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    test("renders loading spinner when loading", () => {
        vi.spyOn(useOffersDataHook, "default").mockReturnValue({
            ...baseHookData,
            loading: true,
            offers: [],
        });

        render(<OffersPage />);

        const spinner = document.querySelector(".animate-spin");
        expect(spinner).toBeInTheDocument();
    });

    test("renders error message when error occurs", () => {
        vi.spyOn(useOffersDataHook, "default").mockReturnValue({
            ...baseHookData,
            error: true,
        });

        render(<OffersPage />);
        expect(screen.getByText("Failed to load offers.")).toBeInTheDocument();
    });

    test("renders 'No offers found' when no offers exist", () => {
        vi.spyOn(useOffersDataHook, "default").mockReturnValue({
            ...baseHookData,
            offers: [],
        });

        render(<OffersPage />);
        expect(screen.getByText("No offers found.")).toBeInTheDocument();
    });

    test("renders charts view by default", () => {
        vi.spyOn(useOffersDataHook, "default").mockReturnValue(baseHookData);

        render(<OffersPage />);
        expect(screen.getByTestId("stats-bar")).toBeInTheDocument();
        expect(screen.getByTestId("charts-section")).toBeInTheDocument();
        expect(screen.queryByTestId("offers-grid")).not.toBeInTheDocument();
        expect(screen.queryByTestId("filter-bar")).not.toBeInTheDocument();
    });

    test("switches to grid view when grid layout button is clicked", () => {
        vi.spyOn(useOffersDataHook, "default").mockReturnValue(baseHookData);

        render(<OffersPage />);
        const gridButton = screen.getByTestId("Grid view");
        fireEvent.click(gridButton);

        expect(screen.getByTestId("filter-bar")).toBeInTheDocument();
        expect(screen.getByTestId("offers-grid")).toBeInTheDocument();

        expect(screen.queryByTestId("charts-section")).not.toBeInTheDocument();
    });

    test("switches back to charts view when chart layout button is clicked", () => {
        vi.spyOn(useOffersDataHook, "default").mockReturnValue(baseHookData);

        render(<OffersPage />);
        const gridButton = screen.getByTestId("Grid view");
        fireEvent.click(gridButton);

        const chartsButton = screen.getByTestId("Charts view");
        fireEvent.click(chartsButton);

        expect(screen.getByTestId("charts-section")).toBeInTheDocument();
        expect(screen.queryByTestId("filter-bar")).not.toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<OffersPage />);
        expect(asFragment()).toMatchSnapshot();
    });
});
