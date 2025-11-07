export function extractFilterOptions(offers) {
    const statuses = [...new Set(offers.map(o => o.status))];
    const salespeople = [...new Set(offers.map(o => o.salesperson))];
    const depots = [...new Set(offers.map(o => o.depot))];

    return { statuses, salespeople, depots };
}