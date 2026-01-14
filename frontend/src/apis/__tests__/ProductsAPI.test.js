import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import ProductsAPI from "../ProductsAPI.js";

vi.mock("axios");

describe("ProductsAPI", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("calls the correct endpoint with query params", async () => {
        const mockResponse = { data: { content: [], totalPages: 5 } };
        axios.get.mockResolvedValue(mockResponse);

        await ProductsAPI.getPaged({
            page: 1,
            size: 16,
            name: "Volvo",
            classType: "Truck",
            color: "white",
        });

        expect(axios.get).toHaveBeenCalledWith(
            "http://localhost:8080/api/products/paged",
            {
                params: {
                    page: 1,
                    size: 16,
                    name: "Volvo",
                    class: "Truck",
                    color: "white",
                }
            }
        );
    });

    it("returns data correctly for getPaged", async () => {
        const mockResponse = { data: { content: [{ id: 1 }] } };
        axios.get.mockResolvedValue(mockResponse);

        const result = await ProductsAPI.getPaged({ page: 0 });

        expect(result).toEqual({ content: [{ id: 1 }] });
    });

    it("calls getById with the correct URL", async () => {
        const mockResponse = { data: { id: 10, brand: "MAN" } };
        axios.get.mockResolvedValue(mockResponse);

        const result = await ProductsAPI.getById(10);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/api/products/10");
        expect(result).toEqual({ id: 10, brand: "MAN" });
    });

    it("throws an error when axios fails", async () => {
        axios.get.mockRejectedValue(new Error("Network error"));

        await expect(ProductsAPI.getPaged({ page: 0 }))
            .rejects
            .toThrow("Network error");
    });
});
