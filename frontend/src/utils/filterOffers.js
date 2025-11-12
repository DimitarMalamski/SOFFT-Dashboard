export function filterOffers(offers, filters) {
    let filtered = [...offers];

    if (filters.status) {
        filtered = filtered.filter(o => o.status === filters.status);
    }

    if (filters.salesperson) {
        filtered = filtered.filter(o => o.salesperson === filters.salesperson);
    }

    if (filters.depot) {
        filtered = filtered.filter(o => o.depot === filters.depot);
    }

    return filtered;
}
