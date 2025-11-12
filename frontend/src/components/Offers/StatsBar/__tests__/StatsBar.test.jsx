import { render, screen } from "@testing-library/react";
import StatsBar from "../StatsBar.jsx";
import * as calculateStatsModule from "../../../../utils/calculateStats.js";
import StatCard from "../StatCard.jsx";

vi.mock("../StatCard.jsx", () => ({
    default: ({ label, value }) => (
        <div data-testid="stat-card">
            <span>{label}</span>
            <span>{value}</span>
        </div>
    ),
}));

describe("StatsBar Component", () => {
    const mockOffers = [
        { status: "Pending", totalPrice: 10000 },
        { status: "Declined", totalPrice: 5000 },
        { status: "Pending", totalPrice: 15000 },
    ];

    test("renders StatCards with correct calculated values", () => {
        render(
            <StatsBar offers={mockOffers}
        />);

        expect(screen.getByText("Total Offers")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Declined")).toBeInTheDocument();
        expect(screen.getByText("Total Value (€)")).toBeInTheDocument();

        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("€30,000")).toBeInTheDocument();
    });

    test("renders correctly when there are no offers", () => {
        render(
            <StatsBar offers={[]}
        />);

        expect(screen.getAllByTestId("stat-card")).toHaveLength(4);
        expect(screen.getAllByText("0")).toHaveLength(3);
        expect(screen.getByText("€0")).toBeInTheDocument();
    });

    test("calls calculateOfferStats once with provided offers", () => {
        const spy = vi.spyOn(calculateStatsModule, "calculateOfferStats");
        render(
            <StatsBar offers={mockOffers}
        />);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(mockOffers);
        spy.mockRestore();
    });

    test("matches snapshot with offers", () => {
        const { asFragment } = render(<StatsBar offers={mockOffers} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("matches snapshot with empty offers", () => {
        const { asFragment } = render(<StatsBar offers={[]} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
