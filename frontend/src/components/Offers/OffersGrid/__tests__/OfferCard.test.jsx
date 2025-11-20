import { render, screen } from "@testing-library/react";
import OfferCard from "../OfferCard.jsx";
import OffersGrid from "../OffersGrid.jsx";

describe("OfferCard Component", () => {
    const mockOffer = {
        uuid: "1",
        customerCompanyName: "Nordic Trucks AB",
        status: "Pending",
        depotName: "North Hub",
        expiresAt: "2025-11-10T11:37:32.58",
        totalPrice: 85000,
        salesPersonName: [{ name: "Anna Svensson" }],
    };

    test("renders offer details correctly", () => {
        render(<OfferCard offer={mockOffer} />);

        expect(screen.getByText("Nordic Trucks AB")).toBeInTheDocument();
        expect(screen.getByText(/Pending/i)).toBeInTheDocument();
        expect(screen.getByText(/North Hub/i)).toBeInTheDocument();
        expect(screen.getByText(/Anna Svensson/i)).toBeInTheDocument();
        expect(screen.getByText("€85,000")).toBeInTheDocument();
    });

    test("handles missing fields gracefully", () => {
        render(<OfferCard offer={{ uuid: "2" }} />);
        expect(screen.getByText("Unknown Company")).toBeInTheDocument();
        expect(screen.getByText("Unknown")).toBeInTheDocument();
        expect(screen.getAllByText((content) => content.includes("N/A"))).toHaveLength(3);
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<OfferCard offer={{ uuid: "2" }} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
