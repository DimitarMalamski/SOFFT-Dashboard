import { renderHook, act } from "@testing-library/react";
import { usePagination } from "../usePagination.js";

describe("usePagination hook", () => {
    const mockData = Array.from({ length: 10 }, (_, i) => i + 1);

    test("returns correct initial state", () => {
        const { result } = renderHook(() => usePagination(mockData, 4));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(3);
        expect(result.current.currentData).toEqual([1, 2, 3, 4]);
    });

    test("moves to next and previous pages", () => {
        const { result } = renderHook(() => usePagination(mockData, 4));

        act(() => result.current.nextPage());
        expect(result.current.currentPage).toBe(2);
        expect(result.current.currentData).toEqual([5, 6, 7, 8]);

        act(() => result.current.prevPage());
        expect(result.current.currentPage).toBe(1);
        expect(result.current.currentData).toEqual([1, 2, 3, 4]);
    });

    test("stops at bounds", () => {
        const { result } = renderHook(() => usePagination(mockData, 4));

        act(() => {
            result.current.prevPage();
            result.current.goToPage(100);
        });

        expect(result.current.currentPage).toBe(3);
        expect(result.current.currentData).toEqual([9, 10]);
    });
});
