export function filterOffers(offers, filters) {
    let result = [...offers];

    const norm = (v) => v.toLowerCase();

    if (filters.statuses.length > 0) {
        const statuses = filters.statuses.map(norm);
        result = result.filter(o => statuses.includes(norm(o.status)));
    }

    if (filters.salespersons.length > 0) {
        const names = filters.salespersons.map(norm);
        result = result.filter(o =>
            o.salesPersonName?.some(p =>
                names.includes(norm(p.name))
            )
        );
    }

    if (filters.depots.length > 0) {
        const depots = filters.depots.map(norm);
        result = result.filter(o =>
            depots.includes(norm(o.depotName))
        );
    }

    return result;
}
