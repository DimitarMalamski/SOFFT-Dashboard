export function calculateOfferStats(offers) {
    const normalize = (s) => (s ? s.toLowerCase() : "");

    const total = offers.length;
    const pending = offers.filter((o) => normalize(o.status) === "pending").length;
    const declined = offers.filter((o) => normalize(o.status) === "declined").length;
    const totalValue = offers.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    return {
        total,
        pending,
        declined,
        totalValue,
    };
}