import { transformChartData } from "../transformChartData.js";

describe("transformChartData utility", () => {
    const mockOffers = [
        {
            status: "Pending",
            salesPersons: [{ name: "Alice" }],
            createdAt: "2025-11-10T10:00:00",
        },
        {
            status: "Declined",
            salesPersons: [{ name: "Bob" }],
            createdAt: "2025-11-11T12:00:00",
        },
        {
            status: "Pending",
            salesPersons: [{ name: "Alice" }],
            createdAt: "2025-11-11T13:00:00",
        },
    ];

    test("groups offers correctly by status", () => {
        const { statusCounts } = transformChartData(mockOffers);
        expect(statusCounts).toEqual([
            { name: "Pending", value: 2 },
            { name: "Declined", value: 1 },
        ]);
    });

    test("aggregates offers by salesperson", () => {
        const { salesByPerson } = transformChartData(mockOffers);
        expect(salesByPerson).toEqual([
            { name: "Alice", offers: 2 },
            { name: "Bob", offers: 1 },
        ]);
    });

    test("aggregates offers by date in chronological order", () => {
        const { offersByDate } = transformChartData(mockOffers);
        expect(offersByDate).toEqual([
            { date: "2025-11-10", offers: 1 },
            { date: "2025-11-11", offers: 2 },
        ]);
    });

    test("handles empty input safely", () => {
        const result = transformChartData([]);
        expect(result.statusCounts).toEqual([
            { name: "Pending", value: 0 },
            { name: "Declined", value: 0 },
        ]);
        expect(result.salesByPerson).toEqual([]);
        expect(result.offersByDate).toEqual([]);
    });
});
