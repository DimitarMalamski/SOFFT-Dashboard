import { renderHook, act } from "@testing-library/react";
import { useOfferFilters } from "../offersPage/useOfferFilters.js";
import * as utils from "../../utils/extractFilterOptions.js";

describe("useOfferFilters", () => {
    const mockOffers = [
        { status: "Pending", depotName: "North Hub", salesPersonName: [{ name: "Anna" }] },
    ];
    const mockExtract = { statuses: ["Pending"], salespeople: ["Anna"], depots: ["North Hub"] };

    beforeEach(() => {
        vi.spyOn(utils, "extractFilterOptions").mockReturnValue(mockExtract);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("initializes filters and options correctly", () => {
        const onFilterChange = vi.fn();
        const { result } = renderHook(() => useOfferFilters(mockOffers, onFilterChange));

        expect(result.current.filters).toEqual({ status: "", salesperson: "", depot: "" });
        expect(result.current.options).toEqual(mockExtract);
    });

    test("updates filters and calls onFilterChange", () => {
        const onFilterChange = vi.fn();
        const { result } = renderHook(() => useOfferFilters(mockOffers, onFilterChange));

        act(() => result.current.handleChange("status", "Pending"));

        expect(result.current.filters.status).toBe("Pending");
        expect(onFilterChange).toHaveBeenCalledWith({
            status: "Pending",
            salesperson: "",
            depot: "",
        });
    });

    test("resets filters correctly", () => {
        const onFilterChange = vi.fn();
        const { result } = renderHook(() => useOfferFilters(mockOffers, onFilterChange));

        act(() => result.current.handleChange("status", "Pending"));
        act(() => result.current.handleReset());

        expect(result.current.filters).toEqual({ status: "", salesperson: "", depot: "" });
        expect(onFilterChange).toHaveBeenCalledWith({ status: "", salesperson: "", depot: "" });
    });
});
