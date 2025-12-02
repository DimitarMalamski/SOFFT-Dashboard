import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import SalesAPI from "../SalesAPI.js";

vi.mock("axios");

describe("SalesAPI", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("fetches sales with default statuses", async () => {
        const mockResponse = {
            data: { data: [{ id: 1 }, { id: 2 }] }
        };

        axios.get.mockResolvedValue(mockResponse);

        const result = await SalesAPI.getAllSales();

        expect(result).toEqual([{ id: 1 }, { id: 2 }]);

        expect(axios.get).toHaveBeenCalledWith(
            "http://localhost:8080/api/salesoffers/sales?statuses=Approved&statuses=Completed"
        );
    });

    it("fetches sales with custom statuses", async () => {
        const mockResponse = { data: { data: [{ id: 99 }] } };
        axios.get.mockResolvedValue(mockResponse);

        const result = await SalesAPI.getAllSales(["Pending", "Declined"]);

        expect(result).toEqual([{ id: 99 }]);

        expect(axios.get).toHaveBeenCalledWith(
            "http://localhost:8080/api/salesoffers/sales?statuses=Pending&statuses=Declined"
        );
    });

    it("throws an error on API failure", async () => {
        const error = new Error("Network error");
        axios.get.mockRejectedValue(error);

        await expect(SalesAPI.getAllSales()).rejects.toThrow("Network error");
    });
});
