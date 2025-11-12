import { extractFilterOptions } from "../extractFilterOptions.js";

describe("extractFilterOptions", () => {
    const mockOffers = [
        {
            status: "Pending",
            depotName: "North Hub",
            salesPersonName: [{ name: "Anna" }, { name: "Ben" }],
        },
        {
            status: "Declined",
            depotName: "South Hub",
            salesPersonName: [{ name: "Anna" }],
        },
    ];

    test("returns unique values for statuses, salespeople, and depots", () => {
        const result = extractFilterOptions(mockOffers);
        expect(result.statuses).toEqual(["Pending", "Declined"]);
        expect(result.salespeople).toEqual(["Anna", "Ben"]);
        expect(result.depots).toEqual(["North Hub", "South Hub"]);
    });

    test("handles empty offers safely", () => {
        const result = extractFilterOptions([]);
        expect(result).toEqual({
            statuses: [],
            salespeople: [],
            depots: [],
        });
    });
});
