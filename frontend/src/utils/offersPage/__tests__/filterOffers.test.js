import { filterOffers } from "../filterOffers.js";

describe("filterOffers Utility", () => {
    const offers = [
        {
            status: "Pending",
            salesPersons: [{ name: "Anna Svensson" }],
            depotName: "North Hub",
        },
        {
            status: "Declined",
            salesPersons: [{ name: "John Smith" }],
            depotName: "London Storage",
        },
        {
            status: "Pending",
            salesPersons: [{ name: "Ben Thomas" }],
            depotName: "Paris Hub",
        },
    ];

    test("returns all offers when no filters applied", () => {
        const filters = {
            statuses: [],
            salespersons: [],
            depots: [],
        };

        const result = filterOffers(offers, filters);
        expect(result).toHaveLength(3);
    });

    test("filters by status correctly", () => {
        const filters = {
            statuses: ["Pending"],
            salespersons: [],
            depots: [],
        };

        const result = filterOffers(offers, filters);

        expect(result).toHaveLength(2);
        expect(result.every(o => o.status === "Pending")).toBe(true);
    });

    test("filters by salesperson correctly", () => {
        const filters = {
            statuses: [],
            salespersons: ["John Smith"],
            depots: [],
        };

        const result = filterOffers(offers, filters);

        expect(result).toHaveLength(1);
        expect(result[0].salesPersons[0].name).toBe("John Smith");
    });

    test("filters by depot name correctly", () => {
        const filters = {
            statuses: [],
            salespersons: [],
            depots: ["London Storage"],
        };

        const result = filterOffers(offers, filters);

        expect(result).toHaveLength(1);
        expect(result[0].depotName).toBe("London Storage");
    });

    test("is case-insensitive for names and depots", () => {
        const filters = {
            statuses: [],
            salespersons: ["john smith"],
            depots: ["london storage"],
        };

        const result = filterOffers(
            offers.map(o => ({
                ...o,
                status: o.status.toLowerCase(),
                depotName: o.depotName.toLowerCase(),
                salesPersonName: o.salesPersons.map(p => ({ name: p.name.toLowerCase() }))
            })),
            filters
        );

        expect(result).toHaveLength(1);
    });

    test("returns empty array when no matches found", () => {
        const filters = {
            statuses: ["Declined"],
            salespersons: ["Anna Svensson"],
            depots: ["North Hub"],
        };

        const result = filterOffers(offers, filters);
        expect(result).toHaveLength(0);
    });
});
