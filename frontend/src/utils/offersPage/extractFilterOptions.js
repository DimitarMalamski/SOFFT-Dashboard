export function extractFilterOptions(offers) {
    if (!offers?.length) {
        return { statuses: [], salespeople: [], depots: [] };
    }

    const statuses = [
        ...new Set(offers.map(o => o.status).filter(Boolean)),
    ];

    const salespeople = [
        ...new Set(
            offers.flatMap(o =>
                o.salesPersonName?.map(p => p.name).filter(Boolean) || []
            )
        ),
    ];

    const depots = [
        ...new Set(offers.map(o => o.depotName).filter(Boolean)),
    ];

    return { statuses, salespeople, depots };
}
