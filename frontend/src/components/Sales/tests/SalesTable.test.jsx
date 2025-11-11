import { render, screen, fireEvent } from "@testing-library/react";
import SalesTable from "../SalesTable.jsx";
import {expect} from "vitest";

describe("SalesTable Component", () => {
    const mockData = [
        {
            uuid: "so1",
            referenceId: "OFFER-SE-001",
            customerCompanyName: "Nordic Trucks AB",
            salesPersonName: [{ name: "Anna Svensson" }],
            depotName: "North Hub",
            status: "Pending",
            totalPrice: 85000,
            discount: 5000,
            currency: "EUR",
            createdAt: "2025-11-10T11:37:32.58",
            expiresAt: "2025-12-10T11:37:32.58",
        },
        {
            uuid: "so2",
            referenceId: "OFFER-GB-002",
            customerCompanyName: "EuroTransport Ltd",
            salesPersonName: [{ name: "John Smith" }],
            depotName: "London Storage",
            status: "Approved",
            totalPrice: 120000,
            discount: 0,
            currency: "GBP",
            createdAt: "2025-11-10T11:37:32.58",
            expiresAt: null,
        },
    ];

    test("renders table headers and data rows", () => {
        render(
            <SalesTable
                data={mockData}
                currentPage={1}
                totalPages={1}
                onNext={() => {}}
                onPrev={() => {}}
            />
        );

        const headers = [
            "Reference ID",
            "Customer",
            "Salesperson",
            "Depot",
            "Status",
            "Total (€)",
            "Discount (€)",
            "Created",
            "Expires",
        ];

        headers.forEach((header) => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });

        expect(screen.getByText("OFFER-SE-001")).toBeInTheDocument();
        expect(screen.getByText("OFFER-GB-002")).toBeInTheDocument();
        expect(screen.getByText("Nordic Trucks AB")).toBeInTheDocument();
        expect(screen.getByText("EuroTransport Ltd")).toBeInTheDocument();
    });

    test("renders status badge with correct color classes", () => {
        render(
            <SalesTable
                data={mockData}
                currentPage={1}
                totalPages={1}
                onNext={() => {}}
                onPrev={() => {}}
            />
        );

        const pendingBadge = screen.getByText("Pending");
        const approvedBadge = screen.getByText("Approved");

        expect(pendingBadge.className).toMatch(/bg-yellow-500/);
        expect(approvedBadge.className).toMatch(/bg-emerald-500/);
    });

    test("handles pagination buttons correctly", () => {
        const onNext = vi.fn();
        const onPrev = vi.fn();

        render(
            <SalesTable
                data={mockData}
                currentPage={1}
                totalPages={3}
                onNext={onNext}
                onPrev={onPrev}
            />
        );

        const nextBtn = screen.getByRole("button", {
            name: /next/i
        });

        const prevBtn = screen.getByRole("button", {
            name: /prev/i
        });

        expect(prevBtn).toBeDisabled();

        fireEvent.click(nextBtn);
        expect(onNext).toHaveBeenCalledTimes(1);
    });

    test("shows 'No matching data' when data is empty", () => {
        render(
            <SalesTable
                data={[]}
                currentPage={1}
                totalPages={1}
                onNext={() => {}}
                onPrev={() => {}}
            />
        );

        expect(screen.getByText(/no matching data/i)).toBeInTheDocument();
    });

    test("match the snapshot", () => {
        const { asFragment } = render(
            <SalesTable
                data={[mockData[0]]}
                currentPage={1}
                totalPages={1}
                onNext={() => {}}
                onPrev={() => {}}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test("renders large numbers with locale formatting", () => {
        const localeData = [
            {
                uuid: "so10",
                referenceId: "OFFER-GB-010",
                customerCompanyName: "EuroTransport Ltd",
                salesPersonName: [{ name: "John Smith" }],
                depotName: "London Storage",
                status: "Approved",
                totalPrice: 1234567.89,
                discount: 0,
                currency: "GBP",
                createdAt: "2025-11-10T11:37:32.58",
                expiresAt: null,
            },
        ];

        render(
            <SalesTable
                data={localeData}
                currentPage={1}
                totalPages={1}
                onNext={() => {}}
                onPrev={() => {}}
            />
        );

        const cell = screen.getByText(/GBP/i);
        expect(cell.textContent).toMatch(/1[,\s]?234[,\s]?567/);
    });
});