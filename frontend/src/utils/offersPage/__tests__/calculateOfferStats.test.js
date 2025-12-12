import { calculateOfferStats } from "../calculateStats.js";

describe("calculateOfferStats Utility", () => {
    test("calculates stats correctly for mixed offer statuses", () => {
        const offers = [
            { status: "Pending", totalPrice: 5000 },
            { status: "Declined", totalPrice: 2000 },
            { status: "Pending", totalPrice: 3000 },
        ];

        const result = calculateOfferStats(offers);

        expect(result).toEqual({
            total: 3,
            pending: 2,
            declined: 1,
            totalValue: 10000,
        });
    });

    test("handles empty offer list gracefully", () => {
        const result = calculateOfferStats([]);
        expect(result).toEqual({
            total: 0,
            pending: 0,
            declined: 0,
            totalValue: 0,
        });
    });

    test("ignores missing totalPrice fields", () => {
        const offers = [
            { status: "Pending" },
            { status: "Declined", totalPrice: 1500 },
            { status: "Pending" },
        ];

        const result = calculateOfferStats(offers);
        expect(result.totalValue).toBe(1500);
    });

    test("is case-insensitive for status matching", () => {
        const offers = [
            { status: "pending" },
            { status: "PENDING" },
            { status: "Declined" },
        ];

        const result = calculateOfferStats(offers);
        expect(result.pending).toBe(2);
        expect(result.declined).toBe(1);
    });
});
