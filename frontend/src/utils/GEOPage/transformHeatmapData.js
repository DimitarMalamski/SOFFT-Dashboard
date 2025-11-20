import countryCoordinates from "../../mock-data/GEOPage/mock-country-coordinates.json";

export const transformHeatmapData = (data, mode = "country") => {
    if (mode === "country") {
        return data
            .map(item => {
                const coords = countryCoordinates[item.countryCode];
                if (!coords) return null;
                return [coords.lat, coords.lng, item.offerCount];
            })
            .filter(Boolean);
    }

    if (mode === "address") {
        // TODO
        return data.map(item => [item.lat, item.lng, 1]);
    }

    return [];
};