export function extractFilterOptions(offers) {
    return {
        statuses: [...new Set(offers.map(o => o.status).filter(Boolean))],
        salespeople: [...new Set(offers.map(o => o.salesperson).filter(Boolean))],
        depots: [...new Set(offers.map(o => o.depot).filter(Boolean))],
    };
}