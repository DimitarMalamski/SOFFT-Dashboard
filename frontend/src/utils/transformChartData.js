export function transformChartData(offers) {
    // By Status
    const statusCounts = ["Pending", "Approved", "Cancelled"].map((status) => ({
        name: status,
        value: offers.filter((o) => o.status === status).length,
    }));

    // Per Salesperson
    const salesByPerson = Object.entries(
        offers.reduce((acc, o) => {
            const key = o.salesperson || "Unknown";
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {})
    )
        .map(([name, offersCount]) => ({ name, offers: offersCount }))
        .sort((a, b) => b.offers - a.offers)
        .slice(0, 5);

    // By timeline
    const offersByDate = Object.entries(
        offers.reduce((acc, o) => {
            const date = o.createdAt.slice(0, 10);
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {})
    )
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([date, count]) => ({ date, offers: count }));

    return { statusCounts, salesByPerson, offersByDate };
}
