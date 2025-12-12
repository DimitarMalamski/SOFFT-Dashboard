export function filterOffersOverview(offers, filters) {
    return offers.filter((offer) => {

        const matchesSalesmen =
            filters.salesmen.length === 0 ||
            offer.salesPerson?.some((p) => {
                const name = p?.name?.trim();
                if (!name) return false;
                return filters.salesmen.includes(name);
            });

        const matchesProductType =
            filters.productTypes.length === 0 ||
            offer.salesOfferLine?.some((line) =>
                filters.productTypes.includes(line.product?.productType?.toUpperCase())
            );

        const matchesBrand =
            filters.brands.length === 0 ||
            offer.salesOfferLine?.some((line) =>
                filters.brands.includes(line.product?.brand?.toUpperCase())
            );

        const matchesIncoterm =
            filters.incoterms.length === 0 ||
            offer.salesOfferLine?.some((line) =>
                filters.incoterms.includes(line.delivery?.incoterm?.toUpperCase())
            );

        const matchesCountry =
            filters.countries.length === 0 ||
            offer.salesOfferLine?.some((line) =>
                filters.countries.includes(line.delivery?.destinationCountryCode)
            );

        const offerDate = offer.createdAt ? new Date(offer.createdAt + "Z") : null;
        let matchesDate = true;

        if (filters.dateRange === "today" && offerDate) {
            const today = new Date();
            today.setHours(0,0,0,0);
            matchesDate = offerDate >= today;
        }

        if (filters.dateRange === "7d" && offerDate) {
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - 7);
            matchesDate = offerDate >= cutoff;
        }

        if (filters.dateRange === "30d" && offerDate) {
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - 30);
            matchesDate = offerDate >= cutoff;
        }

        if (filters.dateRange === "custom" && offerDate) {
            const { startDate, endDate } = filters;
            matchesDate =
                (!startDate || offerDate >= new Date(startDate)) &&
                (!endDate || offerDate <= new Date(endDate));
        }

        return (
            matchesSalesmen &&
            matchesProductType &&
            matchesBrand &&
            matchesIncoterm &&
            matchesCountry &&
            matchesDate
        );
    });
}
