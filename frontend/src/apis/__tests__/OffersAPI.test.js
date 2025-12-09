import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import OffersAPI from "../OffersAPI.js";
import.meta.env.VITE_API_URL;

const BASE_URL = import.meta.env.VITE_API_URL;


vi.mock("axios");

describe("OffersAPI", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("fetches offers successfully", async () => {
        const mockResponse = {
            data: {
                data: [{ id: 1 }, { id: 2 }],
            }
        };

        axios.get.mockResolvedValue(mockResponse);

        const result = await OffersAPI.getOffersByStatus();

        expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it("calls the correct endpoint with correct query params", async () => {
        const mockResponse = { data: { data: [] } };
        axios.get.mockResolvedValue(mockResponse);

        await OffersAPI.getOffersByStatus();

        expect(axios.get).toHaveBeenCalledWith(
            `${BASE_URL}/api/salesoffers/sales`,
            { params: { statuses: ["Pending", "Declined"] } }
        );
    });

    it("throws an error when the API call fails", async () => {
        axios.get.mockRejectedValue(new Error("Network error"));

        await expect(OffersAPI.getOffersByStatus()).rejects.toThrow("Network error");
    });
});
