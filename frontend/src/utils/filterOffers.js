export function filterOffers(offers, filters) {
    let filtered = [...offers];

    if (filters.status && filters.status !== "All") {
        filtered = filtered.filter((o) => o.status === filters.status);
    }

    if (filters.salesperson && filters.salesperson !== "All") {
        filtered = filtered.filter((o) =>
            o.salesPersonName?.some(
                (p) =>
                    p.name &&
                    p.name.toLowerCase() === filters.salesperson.toLowerCase()
            )
        );
    }

    if (filters.depot && filters.depot !== "All") {
        filtered = filtered.filter(
            (o) =>
                o.depotName &&
                o.depotName.toLowerCase() === filters.depot.toLowerCase()
        );
    }

    return filtered;
}
