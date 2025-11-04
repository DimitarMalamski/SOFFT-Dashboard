export function filterOffers(offers, filters) {
    return offers.filter((offer) => {
        const matchesSalesman =
            !filters.salesman ||
            offer.salesPersons?.some((p) =>
                p.name?.toLowerCase().includes(filters.salesman.toLowerCase())
            );

        const matchesProductType =
            !filters.productType ||
            offer.salesOfferLine?.some((line) =>
                line.product?.productType
                    ?.toLowerCase()
                    .includes(filters.productType.toLowerCase())
            );

        const matchesBrand =
            !filters.brand ||
            offer.salesOfferLine?.some((line) =>
                line.product?.brand?.toLowerCase().includes(filters.brand.toLowerCase())
            );

        const matchesIncoterm =
            !filters.incoterm ||
            offer.salesOfferLine?.some((line) =>
                line.delivery?.incoterm
                    ?.toUpperCase()
                    .includes(filters.incoterm.toUpperCase())
            );

        const matchesCountry =
            !filters.country ||
            offer.salesOfferLine?.some((line) =>
                line.delivery?.destinationCountryCode
                    ?.toUpperCase()
                    .includes(filters.country.toUpperCase())
            );

        let matchesDate = true;
        const offerDate = offer.expiresAt ? new Date(offer.expiresAt) : null;

        if (filters.startDate && filters.endDate && offerDate) {
            matchesDate =
                offerDate >= new Date(filters.startDate) &&
                offerDate <= new Date(filters.endDate);
        } else if (filters.dateRange && offerDate) {
            const now = new Date();
            const days = parseInt(filters.dateRange.replace("d", ""), 10);
            const cutoff = new Date(now.setDate(now.getDate() - days));
            matchesDate = offerDate >= cutoff;
        }

        return (
            matchesSalesman &&
            matchesProductType &&
            matchesBrand &&
            matchesIncoterm &&
            matchesCountry &&
            matchesDate
        );
    });
}
