import { renderHook, act } from "@testing-library/react";
import useOffersData from "../useOffersData.js";
import OffersAPI from "../../../apis/OffersAPI.js";

vi.mock("../../../apis/OffersAPI.js", () => ({
    default: { getOffersByStatus: vi.fn() },
}));

const mockOffers = [
    {
        uuid: "so1",
        status: "Pending",
        depotName: "North Hub",
        customerCompanyName: "Nordic Trucks AB",
        salesPersons: [{ name: "Anna Svensson" }],
        totalPrice: 85000,
        createdAt: "2025-11-10T11:37:32.58",
    },
    {
        uuid: "so2",
        status: "Declined",
        depotName: "Lyon Terminal",
        customerCompanyName: "CargoMax SAS",
        salesPersons: [{ name: "Ben Thomas" }],
        totalPrice: 90000,
        createdAt: "2025-11-10T11:37:32.58",
    },
];

describe("useOffersData Hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("fetches offers successfully and sets loading state", async () => {
        OffersAPI.getOffersByStatus.mockResolvedValue(mockOffers);

        const { result } = renderHook(() => useOffersData());
        await act(async () => {});

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.offers).toHaveLength(2);
        expect(result.current.filteredOffers).toHaveLength(2);
    });

    it("handles API failure correctly", async () => {
        OffersAPI.getOffersByStatus.mockRejectedValue(new Error("Network Error"));

        const { result } = renderHook(() => useOffersData());
        await act(async () => {});

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.offers).toEqual([]);
        expect(result.current.filteredOffers).toEqual([]);
        expect(result.current.loading).toBe(false);
    });

    it("filters offers correctly when filters are updated", async () => {
        OffersAPI.getOffersByStatus.mockResolvedValue(mockOffers);

        const { result } = renderHook(() => useOffersData());
        await act(async () => {});

        act(() => {
            result.current.setFilters({
                statuses: ["Pending"],
                salespersons: [],
                depots: []
            });
        });
        expect(result.current.filteredOffers).toHaveLength(1);
        expect(result.current.filteredOffers[0].status).toBe("Pending");

        act(() => {
            result.current.setFilters({
                statuses: [],
                salespersons: [],
                depots: ["Lyon Terminal"]
            });
        });
        expect(result.current.filteredOffers).toHaveLength(1);
        expect(result.current.filteredOffers[0].depotName).toBe("Lyon Terminal");
    });
});
