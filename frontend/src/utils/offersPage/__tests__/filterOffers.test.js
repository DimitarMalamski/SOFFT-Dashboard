import { filterOffers } from "../filterOffers.js";

describe("filterOffers Utility", () => {
    const offers = [
        {
            status: "Pending",
            salesPersonName: [{ name: "Anna Svensson" }],
            depotName: "North Hub",
        },
        {
            status: "Declined",
            salesPersonName: [{ name: "John Smith" }],
            depotName: "London Storage",
        },
        {
            status: "Pending",
            salesPersonName: [{ name: "Ben Thomas" }],
            depotName: "Paris Hub",
        },
    ];

    test("returns all offers when filters are set to 'All'", () => {
        const filters = { status: "All", salesperson: "All", depot: "All" };
        const result = filterOffers(offers, filters);
        expect(result).toHaveLength(3);
    });

    test("filters by status correctly", () => {
        const filters = { status: "Pending", salesperson: "All", depot: "All" };
        const result = filterOffers(offers, filters);
        expect(result).toHaveLength(2);
        expect(result.every(o => o.status === "Pending")).toBe(true);
    });

    test("filters by salesperson correctly", () => {
        const filters = { status: "All", salesperson: "John Smith", depot: "All" };
        const result = filterOffers(offers, filters);
        expect(result).toHaveLength(1);
        expect(result[0].salesPersonName[0].name).toBe("John Smith");
    });

    test("filters by depot name correctly", () => {
        const filters = { status: "All", salesperson: "All", depot: "London Storage" };
        const result = filterOffers(offers, filters);
        expect(result).toHaveLength(1);
        expect(result[0].depotName).toBe("London Storage");
    });

    test("is case-insensitive for names and depots", () => {
        const filters = { status: "All", salesperson: "john smith", depot: "london storage" };
        const result = filterOffers(offers, filters);
        expect(result).toHaveLength(1);
    });

    test("returns empty array when no matches found", () => {
        const filters = { status: "Declined", salesperson: "Anna", depot: "North Hub" };
        const result = filterOffers(offers, filters);
        expect(result).toHaveLength(0);
    });
});
