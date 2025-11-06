export function calculateOfferStats(offers) {
    const total = offers.length;
    const pending = offers.filter((o) => o.status === "Pending").length;
    const approved = offers.filter((o) => o.status === "Approved").length;
    const cancelled = offers.filter((o) => o.status === "Cancelled").length;
    const totalValue = offers.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    return {
        total,
        pending,
        approved,
        cancelled,
        totalValue,
    };
}