export function extractFilterOptions(offers) {
    return {
        statuses: [...new Set(offers.map((o) => o.status))],
        salespeople: [...new Set(offers.map((o) => o.salesperson))],
        depots: [...new Set(offers.map((o) => o.depot))],
    };
}