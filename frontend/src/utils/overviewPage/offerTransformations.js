// --- CHART DATA TRANSFORMATION ---
export function transformData(raw, selected) {
    switch (selected) {
        case "offersPerSalesman": {
            const counts = {};
            raw.forEach((offer) => {
                if (offer.salesPersons?.length) {
                    offer.salesPersons.forEach((p) => {
                        const name = p?.name?.trim();
                        if (!name) return;
                        counts[name] = (counts[name] || 0) + 1;
                    });
                }
            });

            return Object.entries(counts)
                .map(([salesman, count]) => ({ salesman, count }))
                .sort((a, b) => b.count - a.count);
        }

        case "offersPerCountry": {
            const counts = {};
            raw.forEach((offer) => {
                const country = offer.salesOfferLine?.[0]?.delivery?.destinationCountryCode?.trim();
                if (!country) return;
                counts[country] = (counts[country] || 0) + 1;
            });
            return Object.entries(counts)
                .map(([country, count]) => ({ country, count }))
                .sort((a, b) => b.count - a.count);
        }

        case "totalValueOverTime": {
            const totalsByDate = {};
            raw.forEach((offer) => {
                const date = offer.expiresAt?.split("T")[0] || "Unknown";
                const total = offer.salesOfferLine?.reduce(
                    (sum, line) => sum + (line.productPrice?.amount || 0),
                    0
                ) || 0;
                totalsByDate[date] = (totalsByDate[date] || 0) + total;
            });
            return Object.entries(totalsByDate).map(([date, total]) => ({ date, total }));
        }

        case "conversionRate": {
            const statsByDate = {};
            raw.forEach((offer) => {
                const date = offer.updatedAt?.split(" ")[0];
                if (!date) return;

                statsByDate[date] ??= { offers: 0, orders: 0 };
                statsByDate[date].offers++;

                const accepted = offer.statusDescription === "Accepted";
                const hasOrders = offer.salesOfferOrders?.length > 0;
                if (accepted && hasOrders) statsByDate[date].orders++;
            });

            return Object.entries(statsByDate).map(([date, stats]) => ({
                date,
                rate: stats.offers > 0 ? (stats.orders / stats.offers) * 100 : 0,
            }));
        }

        case "leadTimeAnalysis": {
            const acceptedOffers = raw.filter(
                (offer) =>
                    offer.statusDescription === "Accepted" &&
                    offer.salesOfferOrders?.length > 0
            );
            return acceptedOffers.map((offer) => {
                const offerDate = new Date(offer.createdAt);
                const orderDate = new Date(offer.salesOfferOrders[0].createdAt);
                const leadTimeDays = (orderDate - offerDate) / (1000 * 60 * 60 * 24);
                return {
                    referenceId: offer.referenceId,
                    leadTime: Number(leadTimeDays.toFixed(2)),
                };
            });
        }

        default:
            return [];
    }
}

// --- DASHBOARD CARD HELPERS ---
export function getLast7DaysOrders(raw) {
    const ordersByDay = {};
    raw.forEach((offer) => {
        if (!offer.salesOfferOrders?.length) return;
        const date = new Date(offer.salesOfferOrders[0].createdAt);
        const label = date.toLocaleDateString('en-US', { weekday: 'short' });
        ordersByDay[label] = (ordersByDay[label] || 0) + 1;
    });
    const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return daysOrder.map((d) => ({ label: d, value: ordersByDay[d] || 0 }));
}

export function getConversionStats(raw) {
    let total = 0, wins = 0;
    raw.forEach((offer) => {
        total++;
        if (offer.statusDescription === "Accepted" && offer.salesOfferOrders?.length > 0) {
            wins++;
        }
    });
    return { wins, total };
}

export function getTimeToSale(raw) {
    const accepted = raw.filter(
        (offer) => offer.statusDescription === "Accepted" && offer.salesOfferOrders?.length > 0
    );

    const points = accepted.map((offer, i) => {
        const offerDate = new Date(offer.createdAt);
        const orderDate = new Date(offer.salesOfferOrders[0].createdAt);
        const diffDays = (orderDate - offerDate) / (1000 * 60 * 60 * 24);
        return { label: `D${i + 1}`, value: Number(diffDays.toFixed(1)) };
    });

    const avg = points.length
        ? points.reduce((s, p) => s + p.value, 0) / points.length
        : 0;

    return { points, avg };
}

export function transformSalesMan(offers) {
    const counts = {};
    offers.forEach((offer) => {
        if (offer.salesPersons?.length) {
            offer.salesPersons.forEach((p) => {
                if (!p.name) return;
                const name = p.name.trim();

                if (!name) return;

                counts[name] = (counts[name] || 0) + 1;
            });
        }
    });

    return Object.entries(counts)
        .map(([salesman, count]) => ({ salesman, count }))
        .sort((a, b) => b.count - a.count);
}