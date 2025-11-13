import {
    transformData,
    getLast7DaysOrders,
    getConversionStats,
    getTimeToSale,
    transformSalesMan
} from "../offerTransformations.js";

describe("transformData", () => {
    const baseOffers = [
        {
            salesPersons: [{ name: "Anna" }],
            salesOfferLine: [
                {
                    delivery: { destinationCountryCode: "DE" },
                    product: { productType: "Truck", brand: "Volvo" },
                    productPrice: { amount: 1000 }
                }
            ],
            expiresAt: "2025-11-10T00:00:00",
            updatedAt: "2025-11-10 12:00:00",
            statusDescription: "Accepted",
            salesOfferOrders: [{ createdAt: "2025-11-11T00:00:00" }],
            createdAt: "2025-11-09T00:00:00",
            referenceId: 1
        },
        {
            salesPersons: [{ name: "Ben" }],
            salesOfferLine: [
                {
                    delivery: { destinationCountryCode: "FR" },
                    product: { productType: "Trailer", brand: "MAN" },
                    productPrice: { amount: 2000 }
                }
            ],
            expiresAt: "2025-11-10T00:00:00",
            updatedAt: "2025-11-10 12:00:00",
            statusDescription: "Pending",
            salesOfferOrders: [],
            createdAt: "2025-11-09T00:00:00",
            referenceId: 2
        }
    ];

    test("offersPerSalesman", () => {
        const result = transformData(baseOffers, "offersPerSalesman");
        expect(result).toEqual([
            { salesman: "Anna", count: 1 },
            { salesman: "Ben", count: 1 }
        ]);
    });

    test("offersPerCountry", () => {
        const result = transformData(baseOffers, "offersPerCountry");
        expect(result).toEqual([
            { country: "DE", count: 1 },
            { country: "FR", count: 1 }
        ]);
    });

    test("totalValueOverTime", () => {
        const result = transformData(baseOffers, "totalValueOverTime");
        expect(result).toEqual([
            { date: "2025-11-10", total: 3000 }
        ]);
    });

    test("conversionRate", () => {
        const result = transformData(baseOffers, "conversionRate");
        expect(result).toEqual([
            { date: "2025-11-10", rate: 50 } // 1/2 accepted
        ]);
    });

    test("leadTimeAnalysis", () => {
        const result = transformData(baseOffers, "leadTimeAnalysis");

        // Lead time = (Nov 11 - Nov 9) = 2 days
        expect(result).toEqual([
            { referenceId: 1, leadTime: 2 }
        ]);
    });

    test("default returns empty", () => {
        expect(transformData(baseOffers, "unknown")).toEqual([]);
    });
});


// ---------------------------------------------------------
// getLast7DaysOrders
// ---------------------------------------------------------
describe("getLast7DaysOrders", () => {
    test("returns correct daily order map", () => {
        const offers = [
            {
                salesOfferOrders: [{ createdAt: "2025-11-10T00:00:00" }]
            }
        ];

        const result = getLast7DaysOrders(offers);
        expect(result).toEqual([
            { label: "Mon", value: 1 },
            { label: "Tue", value: 0 },
            { label: "Wed", value: 0 },
            { label: "Thu", value: 0 },
            { label: "Fri", value: 0 },
            { label: "Sat", value: 0 },
            { label: "Sun", value: 0 }
        ]);
    });
});


// ---------------------------------------------------------
// getConversionStats
// ---------------------------------------------------------
describe("getConversionStats", () => {
    test("counts wins and totals", () => {
        const offers = [
            { statusDescription: "Accepted", salesOfferOrders: [{}] },
            { statusDescription: "Pending", salesOfferOrders: [] },
            { statusDescription: "Accepted", salesOfferOrders: [] }
        ];

        const result = getConversionStats(offers);

        expect(result).toEqual({
            wins: 1,
            total: 3
        });
    });
});


// ---------------------------------------------------------
// getTimeToSale
// ---------------------------------------------------------
describe("getTimeToSale", () => {
    test("maps accepted offers into points + average", () => {
        const offers = [
            {
                statusDescription: "Accepted",
                createdAt: "2025-11-01T00:00:00",
                salesOfferOrders: [{ createdAt: "2025-11-04T00:00:00" }]
            },
            {
                statusDescription: "Accepted",
                createdAt: "2025-11-01T00:00:00",
                salesOfferOrders: [{ createdAt: "2025-11-03T00:00:00" }]
            }
        ];

        const { points, avg } = getTimeToSale(offers);

        expect(points).toEqual([
            { label: "D1", value: 3 },
            { label: "D2", value: 2 }
        ]);

        expect(avg).toBe(2.5);
    });
});


// ---------------------------------------------------------
// transformSalesMan
// ---------------------------------------------------------
describe("transformSalesMan", () => {
    test("counts occurrences and sorts descending", () => {
        const offers = [
            { salesPersons: [{ name: "Anna" }] },
            { salesPersons: [{ name: "Anna" }] },
            { salesPersons: [{ name: "Ben" }] }
        ];

        const result = transformSalesMan(offers);

        expect(result).toEqual([
            { salesman: "Anna", count: 2 },
            { salesman: "Ben", count: 1 }
        ]);
    });

    test("ignores missing or blank names", () => {
        const offers = [
            { salesPersons: [{ name: " " }] },
            { salesPersons: [{ name: null }] },
            { salesPersons: [] },
            {}
        ];

        expect(transformSalesMan(offers)).toEqual([]);
    });
});
