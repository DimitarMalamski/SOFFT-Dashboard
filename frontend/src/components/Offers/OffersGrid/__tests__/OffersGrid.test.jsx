import { render, screen } from "@testing-library/react";
import OffersGrid from "../OffersGrid.jsx";
import * as hook from "../../../../hooks/usePagination.js";

describe("OffersGrid Component", () => {
    const mockNext = vi.fn();
    const mockPrev = vi.fn();

    const mockPagination = {
        currentPage: 1,
        totalPages: 2,
        currentData: [
            {
                uuid: "offer1",
                customerCompanyName: "CargoMax",
                status: "Pending",
                depotName: "Lyon Terminal",
                salesPersonName: [{ name: "Alice" }],
                totalPrice: 30000,
            },
        ],
        nextPage: mockNext,
        prevPage: mockPrev,
    };

    beforeEach(() => {
        vi.spyOn(hook, "usePagination").mockReturnValue(mockPagination);
    });

    afterEach(() => vi.restoreAllMocks());

    test("renders OfferCards and pagination when data is available", () => {
        render(<OffersGrid offers={[]} />);

        expect(screen.getByText(/Offer Details/i)).toBeInTheDocument();
        expect(screen.getByText("CargoMax")).toBeInTheDocument();
        expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    test("renders empty state when no offers exist", () => {
        vi.spyOn(hook, "usePagination").mockReturnValue({
            currentPage: 1,
            totalPages: 1,
            currentData: [],
            nextPage: vi.fn(),
            prevPage: vi.fn(),
        });

        render(<OffersGrid offers={[]} />);
        expect(screen.getByText("No offers found")).toBeInTheDocument();
        expect(screen.getByText(/Try adjusting your filters/i)).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<OffersGrid offers={[]} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
