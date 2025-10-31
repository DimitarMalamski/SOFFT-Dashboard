// utils/normalizeSalesOffers.js
export default function normalizeSalesOffers(rawResponse) {
  const offersArray = Array.isArray(rawResponse.data)
    ? rawResponse.data
    : rawResponse.data
      ? [rawResponse.data]
      : Array.isArray(rawResponse)
        ? rawResponse
        : [rawResponse];

  return offersArray.map((offer) => {
    const salesOfferLines = Array.isArray(offer.salesOfferLine) ? offer.salesOfferLine : [];
    const normalizedLines = salesOfferLines.map((line) => ({
      ...line,
      productPrice: {
        currency: line.productPrice?.currency || 'EUR',
        amount: Number(line.productPrice?.amount || 0),
      },
      delivery: {
        ...line.delivery,
        transportDays: Number(line.delivery?.transportDays || 0),
        originalPrice: Number(line.delivery?.originalPrice || 0),
        price: Number(line.delivery?.price || 0),
      },
      product: {
        ...line.product,
        enginePower: Number(line.product?.enginePower || 0),
        mileage: Number(line.product?.mileage || 0),
      },
      crossSellProducts: Array.isArray(line.crossSellProducts)
        ? line.crossSellProducts.map((p) => ({
            ...p,
            price: {
              currency: p.price?.currency || 'EUR',
              amount: Number(p.price?.amount || 0),
            },
            originalPrice: {
              currency: p.originalPrice?.currency || 'EUR',
              amount: Number(p.originalPrice?.amount || 0),
            },
          }))
        : [],
    }));

    return {
      uuid: offer.uuid,
      ticketId: offer.ticketId,
      referenceId: offer.referenceId,
      status: offer.status,
      expiresAt: offer.expiresAt,
      currency: offer.currency,
      exchangeRate: Number(offer.exchangeRate || 1),
      discount: {
        price: {
          currency: offer.discount?.price?.currency || 'EUR',
          amount: Number(offer.discount?.price?.amount || 0),
        },
      },
      customerCompany: offer.customerCompany || offer.company || {},
      salesOfferLine: normalizedLines,
      salesPersons: Array.isArray(offer.salesPersons) ? offer.salesPersons : [],
      statusDescription: offer.statusDescription || '',
      createdAt: offer.createdAt || new Date().toISOString(),
      updatedAt: offer.updatedAt || new Date().toISOString(),
      salesOfferOrders: offer.salesOfferOrders || [],
    };
  });
}
