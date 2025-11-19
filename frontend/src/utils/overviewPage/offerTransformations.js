// --- CHART DATA TRANSFORMATION ---
export function transformData(raw, selected) {
    switch (selected) {
        case "offersPerSalesman": {
            const counts = {};
            raw.forEach((offer) => {
                if (offer.salesPerson?.length) {
                    offer.salesPerson.forEach((p) => {
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
            console.log(">>> RAW offers (sample 2):", raw.slice(0, 5));
            const leadTimes = raw.map(offer => {
                const offerDate = new Date(offer.createdAt);
                const transportDays = offer.salesOfferLine?.[0]?.delivery?.transportDays || 0;
                const leadTime = transportDays;

                return {
                    referenceId: offer.referenceId,
                    leadTime
                };
            });
            return leadTimes;
        }

        default:
            return [];
    }
}

// --- DASHBOARD CARD HELPERS ---
export function getLast7DaysOrders(raw) {
    const ordersByDay = {};
    raw.forEach((offer) => {
        const reserved = offer.salesOfferLine?.[0]?.reservedUntil;
        if (!reserved) return;
        const date = new Date(reserved);
        if (isNaN(date)) return; // защита от некорректной даты
        const label = date.toLocaleDateString('en-US', { weekday: 'short' });
        ordersByDay[label] = (ordersByDay[label] || 0) + 1;
    });

    const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return daysOrder.map(d => ({ label: d, value: ordersByDay[d] || 0 }));
}

// Conversion stats
export function getConversionStats(raw) {
    let total = raw.length;
    let wins = raw.filter(offer => offer.status === 1 || offer.status === 2).length;

    return { wins, total };
}

// Time to sale (lead time)
export function getTimeToSale(raw) {
    const accepted = raw.filter(
        offer => (offer.status === 1 || offer.status === 2) && offer.salesOfferLine?.length
    );

    const points = accepted.map((offer, i) => {
        const offerDate = new Date(offer.createdAt);
        const reservedDate = new Date(offer.salesOfferLine[0].reservedUntil);
        if (isNaN(offerDate) || isNaN(reservedDate)) return null;
        const diffDays = (reservedDate - offerDate) / (1000 * 60 * 60 * 24);
        return { label: `D${i + 1}`, value: Number(diffDays.toFixed(1)) };
    }).filter(Boolean); // убираем null

    const avg = points.length
        ? points.reduce((s, p) => s + p.value, 0) / points.length
        : 0;

    return { points, avg };
}

export function transformSalesMan(offers) {
    const counts = {};
    offers.forEach((offer) => {
        if (offer.salesPerson?.length) {
            offer.salesPerson.forEach((p) => {
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