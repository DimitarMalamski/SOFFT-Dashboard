import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import SalesOffersAPI from "../SalesOffersAPI.js";

vi.mock("axios");

describe("SalesOffersAPI", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("fetches simple sales offers", async () => {
        const mockResponse = { data: { data: [{ id: 1 }] } };
        axios.get.mockResolvedValue(mockResponse);

        const result = await SalesOffersAPI.getSalesOffers();

        expect(result).toEqual([{ id: 1 }]);

        expect(axios.get).toHaveBeenCalledWith(
            "http://localhost:8080/api/salesoffers/simple"
        );
    });

    it("fetches sales offers per country", async () => {
        const mockResponse = { data: { data: [{ country: "DE", count: 5 }] } };
        axios.get.mockResolvedValue(mockResponse);

        const result = await SalesOffersAPI.getSalesOffersPerCountry();

        expect(result).toEqual([{ country: "DE", count: 5 }]);

        expect(axios.get).toHaveBeenCalledWith(
            "http://localhost:8080/api/salesoffers/per-country"
        );
    });

    it("throws on error in getSalesOffers", async () => {
        const error = new Error("Network fail");
        axios.get.mockRejectedValue(error);

        await expect(SalesOffersAPI.getSalesOffers()).rejects.toThrow("Network fail");
    });

    it("throws on error in getSalesOffersPerCountry", async () => {
        const error = new Error("Server down");
        axios.get.mockRejectedValue(error);

        await expect(SalesOffersAPI.getSalesOffersPerCountry()).rejects.toThrow("Server down");
    });
});
