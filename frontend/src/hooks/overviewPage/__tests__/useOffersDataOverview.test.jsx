import { renderHook, act, waitFor } from "@testing-library/react";
import useOffersDataOverview from "../useOffersDataOverview";
import SalesOffersAPI from "../../../apis/SalesOffersAPI";
import { filterOffersOverview } from "../../../utils/overviewPage/filterOffersOverview";

vi.mock("../../../apis/SalesOffersAPI", () => ({
    default: {
        getSalesOffers: vi.fn(),
    },
}));

const mockOffers = [
    {
        salesman: "Anna",
        salesPersons: [{ name: "Anna" }],
        salesOfferLine: [
            {
                product: { productType: "Truck", brand: "Volvo" },
                delivery: { incoterm: "FOB", destinationCountryCode: "DE" },
            },
        ],
        expiresAt: "2025-11-10T12:00:00",
    },
    {
        salesman: "Ben",
        salesPersons: [{ name: "Ben" }],
        salesOfferLine: [
            {
                product: { productType: "Trailer", brand: "MAN" },
                delivery: { incoterm: "CIF", destinationCountryCode: "FR" },
            },
        ],
        expiresAt: "2025-11-12T12:00:00",
    },
];

describe("useOffersDataOverview Hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("loads offers and populates state on success", async () => {
        SalesOffersAPI.getSalesOffers.mockResolvedValue(mockOffers);

        const { result } = renderHook(() => useOffersDataOverview());

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.offers).toEqual(mockOffers);
        expect(result.current.filteredOffers).toEqual(mockOffers);

        expect(result.current.options).toEqual({
            salesmen: ["Anna", "Ben"],
            productTypes: ["TRUCK", "TRAILER"],
            brands: ["VOLVO", "MAN"],
            incoterms: ["FOB", "CIF"],
            countries: ["DE", "FR"],
        });
    });

    test("sets error state on failed fetch", async () => {
        SalesOffersAPI.getSalesOffers.mockRejectedValue(new Error("Network error"));

        const { result } = renderHook(() => useOffersDataOverview());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBeTruthy();
        expect(result.current.offers).toEqual([]);
        expect(result.current.filteredOffers).toEqual([]);
    });

    test("applyFilters updates filteredOffers", async () => {
        SalesOffersAPI.getSalesOffers.mockResolvedValue(mockOffers);

        const { result } = renderHook(() => useOffersDataOverview());

        await waitFor(() => expect(result.current.loading).toBe(false));

        act(() => {
            result.current.setFilters({
                ...result.current.filters,
                salesman: "Anna",
            });
        });

        act(() => {
            result.current.applyFilters();
        });

        expect(result.current.filteredOffers.length).toBe(1);
        expect(result.current.filteredOffers[0].salesPersons[0].name).toBe("Anna");
    });

    test("extracts correct dropdown options", async () => {
        SalesOffersAPI.getSalesOffers.mockResolvedValue(mockOffers);

        const { result } = renderHook(() => useOffersDataOverview());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.options.salesmen).toEqual(["Anna", "Ben"]);
        expect(result.current.options.productTypes).toEqual(["TRUCK", "TRAILER"]);
        expect(result.current.options.brands).toEqual(["VOLVO", "MAN"]);
    });

    test("resets brand when productType changes", async () => {
        SalesOffersAPI.getSalesOffers.mockResolvedValue(mockOffers);

        const { result } = renderHook(() => useOffersDataOverview());
        await waitFor(() => expect(result.current.loading).toBe(false));

        act(() => {
            result.current.setFilters({
                ...result.current.filters,
                brand: "VOLVO",
            });
        });

        expect(result.current.filters.brand).toBe("VOLVO");

        act(() => {
            result.current.setFilters({
                ...result.current.filters,
                productType: "TRUCK",
            });
        });

        await waitFor(() => {
            expect(result.current.filters.brand).toBe("");
        });
    });

    test("filterOffersOverview: filters by country", () => {
        const filtered = filterOffersOverview(mockOffers, {
            salesman: "",
            productType: "",
            brand: "",
            incoterm: "",
            country: "DE",
            startDate: null,
            endDate: null,
            dateRange: "",
        });

        expect(filtered.length).toBe(1);
        expect(filtered[0].salesPersons[0].name).toBe("Anna");
    });
});
