import { renderHook, act, waitFor } from "@testing-library/react";
import { useSalesData } from "../salesPage/useSalesData.js";
import SalesAPI from "../../apis/SalesAPI.js";

vi.mock("../../apis/SalesAPI.js");

describe("useSalesData Hook", () => {
    const mockSales = [
        {
            status: "Approved",
            salesPersonName: [{ name: "Anna" }],
            depotName: "North Hub",
        },
        {
            status: "Completed",
            salesPersonName: [{ name: "Ben" }],
            depotName: "South Hub",
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("fetches and sets sales data successfully", async () => {
        SalesAPI.getAllSales.mockResolvedValue(mockSales);

        const { result } = renderHook(() => useSalesData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBeNull();
        expect(result.current.sales).toHaveLength(2);
        expect(result.current.filtered).toHaveLength(2);
    });

    test("handles API failure", async () => {
        SalesAPI.getAllSales.mockRejectedValue(new Error("Network Error"));

        const { result } = renderHook(() => useSalesData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.sales).toEqual([]);
    });

    test("filters sales based on filters", async () => {
        SalesAPI.getAllSales.mockResolvedValue(mockSales);

        const { result } = renderHook(() => useSalesData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        act(() => {
            result.current.setFilters({
                status: "Approved",
                salesperson: "All",
                depot: "All",
            });
        });

        expect(result.current.filtered).toHaveLength(1);
        expect(result.current.filtered[0].status).toBe("Approved");
    });

    test("resets filters correctly", async () => {
        SalesAPI.getAllSales.mockResolvedValue(mockSales);

        const { result } = renderHook(() => useSalesData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        act(() => {
            result.current.setFilters({
                status: "Approved",
                salesperson: "Anna",
                depot: "North Hub",
            });
            result.current.resetFilters();
        });

        expect(result.current.filters).toEqual({
            status: "All",
            salesperson: "All",
            depot: "All",
        });
    });
});
