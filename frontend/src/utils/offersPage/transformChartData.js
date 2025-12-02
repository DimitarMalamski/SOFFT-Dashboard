export function transformChartData(offers) {
    // --- By Status ---
    const statusCounts = ["Pending", "Declined"].map((status) => ({
        name: status,
        value: offers.filter((o) => o.status === status).length,
    }));

    // --- By Salesperson ---
    const salesByPerson = Object.entries(
        offers.reduce((acc, o) => {
            const personName =
                o.salesPersons?.[0]?.name?.trim() || "Unknown";
            acc[personName] = (acc[personName] || 0) + 1;
            return acc;
        }, {})
    )
        .map(([name, offersCount]) => ({ name, offers: offersCount }))
        .sort((a, b) => b.offers - a.offers)
        .slice(0, 5);

    // --- By Date ---
    const offersByDate = Object.entries(
        offers.reduce((acc, o) => {
            if (!o.createdAt) return acc;
            const date = o.createdAt.slice(0, 10);
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {})
    )
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([date, count]) => ({ date, offers: count }));

    return { statusCounts, salesByPerson, offersByDate };
}
