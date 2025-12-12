import { renderHook, act } from "@testing-library/react";
import { useOfferFilters } from "../useOfferFilters.js";
import * as utils from "../../../utils/offersPage/extractFilterOptions.js";

describe("useOfferFilters", () => {
    const mockOffers = [
        { status: "Pending", depotName: "North Hub", salesPersonName: [{ name: "Anna" }] },
    ];

    const mockExtract = {
        statuses: ["Pending"],
        salespersons: ["Anna"],
        depots: ["North Hub"]
    };

    beforeEach(() => {
        vi.spyOn(utils, "extractFilterOptions").mockReturnValue(mockExtract);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("initializes filters and options correctly", () => {
        const onFilterChange = vi.fn();
        const { result } = renderHook(() => useOfferFilters(mockOffers, onFilterChange));

        expect(result.current.filters).toEqual({
            statuses: [],
            salespersons: [],
            depots: []
        });

        expect(result.current.options).toEqual(mockExtract);
    });

    test("updates filters and calls onFilterChange", () => {
        const onFilterChange = vi.fn();
        const { result } = renderHook(() => useOfferFilters(mockOffers, onFilterChange));

        act(() => result.current.handleChange("statuses", ["Pending"]));

        expect(result.current.filters.statuses).toEqual(["Pending"]);
        expect(onFilterChange).toHaveBeenCalledWith({
            statuses: ["Pending"],
            salespersons: [],
            depots: []
        });
    });

    test("resets filters correctly", () => {
        const onFilterChange = vi.fn();
        const { result } = renderHook(() => useOfferFilters(mockOffers, onFilterChange));

        act(() => result.current.handleChange("statuses", ["Pending"]));
        act(() => result.current.handleReset());

        expect(result.current.filters).toEqual({
            statuses: [],
            salespersons: [],
            depots: []
        });

        expect(onFilterChange).toHaveBeenCalledWith({
            statuses: [],
            salespersons: [],
            depots: []
        });
    });
});
