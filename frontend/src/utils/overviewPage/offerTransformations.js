export function transformData(raw, selected) {
    switch (selected) {

        case "offersPerSalesman": {
            const counts = {};
            raw.forEach(offer => {
                offer.salesPerson?.forEach(p => {
                    const name = p?.name?.trim();
                    if (!name) return;
                    counts[name] = (counts[name] || 0) + 1;
                });
            });
            return Object.entries(counts)
                .map(([salesman, count]) => ({ salesman, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);
        }

        case "offersPerCountry": {
            const counts = {};
            raw.forEach(offer => {
                const country = offer.salesOfferLine?.[0]?.delivery?.destinationCountryCode;
                if (!country) return;
                counts[country] = (counts[country] || 0) + 1;
            });
            return Object.entries(counts).map(([country, count]) => ({ country, count }));
        }

        case "totalValueOverTime": {
            const totals = {};
            raw.forEach(offer => {
                const date = offer.expiresAt?.split("T")[0];
                const total = offer.salesOfferLine?.reduce(
                    (sum, l) => sum + (l.productPrice?.amount || 0),
                    0
                ) || 0;
                totals[date] = (totals[date] || 0) + total;
            });
            return Object.entries(totals).map(([date, total]) => ({ date, total }));
        }

        case "conversionRate": {
            const stats = {};
            raw.forEach(offer => {
                const date = offer.updatedAt?.split(" ")[0];
                if (!date) return;

                stats[date] ??= { offers: 0, accepted: 0 };
                stats[date].offers++;

                if (offer.statusDescription === "Accepted") {
                    stats[date].accepted++;
                }
            });

            return Object.entries(stats).map(([date, s]) => ({
                date,
                rate: (s.accepted / s.offers) * 100
            }));
        }

        case "leadTimeAnalysis": {
            return raw
                .filter(o => o.statusDescription === "Accepted")
                .map(o => {
                    const offerDate = new Date(o.createdAt);
                    const salesOrderDate = new Date(o.salesOfferOrders?.[0]?.createdAt);
                    const diff = (salesOrderDate - offerDate) / (86400000); // ms → days

                    return {
                        referenceId: o.referenceId,
                        leadTime: Math.round(diff)
                    };
                });
        }

        default:
            return [];
    }
}

export function getLast7DaysOrders(raw) {
    const ordersByDay = {};

    raw.forEach(offer => {
        offer.salesOfferOrders?.forEach(order => {
            const date = new Date(order.createdAt);
            if (isNaN(date)) return;
            const label = date.toLocaleDateString("en-US", { weekday: "short" });
            ordersByDay[label] = (ordersByDay[label] || 0) + 1;
        });
    });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map(d => ({ label: d, value: ordersByDay[d] || 0 }));
}

export function getConversionStats(raw) {
    let wins = 0;
    let total = raw.length;

    raw.forEach(o => {
        if (o.statusDescription === "Accepted" && o.salesOfferOrders?.length > 0) {
            wins++;
        }
    });

    return { wins, total };
}

export function getTimeToSale(raw) {
    const accepted = raw.filter(o =>
        o.statusDescription === "Accepted" &&
        o.salesOfferOrders?.length
    );

    const points = accepted.map((o, i) => {
        const start = new Date(o.createdAt);
        const end = new Date(o.salesOfferOrders[0].createdAt);
        const diff = (end - start) / 86400000;
        return { label: `D${i + 1}`, value: diff };
    });

    const avg = points.length
        ? points.reduce((sum, p) => sum + p.value, 0) / points.length
        : 0;

    return { points, avg };
}

export function transformSalesMan(offers) {
    const counts = {};

    offers.forEach(o => {
        o.salesPerson?.forEach(p => {
            const name = p?.name?.trim();
            if (!name) return;
            counts[name] = (counts[name] || 0) + 1;
        });
    });

    return Object.entries(counts)
        .map(([salesman, count]) => ({ salesman, count }))
        .sort((a, b) => b.count - a.count);
}