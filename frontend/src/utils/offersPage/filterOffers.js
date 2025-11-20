export function filterOffers(offers, filters) {
    let result = [...offers];

    if (filters.statuses.length > 0) {
        result = result.filter(o =>
            filters.statuses.includes(o.status)
        );
    }

    if (filters.salespersons.length > 0) {
        result = result.filter(o =>
            o.salesPersonName?.some(p =>
                filters.salespersons.includes(p.name)
            )
        );
    }

    if (filters.depots.length > 0) {
        result = result.filter(o =>
            filters.depots.includes(o.depotName)
        );
    }

    return result;
}
