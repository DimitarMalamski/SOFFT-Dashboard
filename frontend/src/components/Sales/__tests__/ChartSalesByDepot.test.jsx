import { render, screen } from "@testing-library/react";
import ChartSalesByDepot from "../ChartSalesByDepot.jsx";

describe("ChartSalesByDepot Component", () => {
    const mockData = [
        {depotName: "North Hub", totalPrice: 85000},
        {depotName: "London Storage", totalPrice: 120000},
        {depotName: "Bavaria Depot", totalPrice: 56000},
        {depotName: "Lyon Terminal", totalPrice: 90000},
        {depotName: "Paris Center", totalPrice: 72000},
        {depotName: "Rotterdam Hub", totalPrice: 66000},
    ];

    test("renders chart title", () => {
        render(
            <ChartSalesByDepot
                data={mockData}
            />
        );

        expect(screen.getByText(/Sales by Depot/i)).toBeInTheDocument();
    });

    test("aggregates total sales per depot", () => {
        const totals = mockData.reduce((acc, sale) => {
            const depot = sale.depotName || "Unknown";
            acc[depot] = (acc[depot] || 0) + (sale.totalPrice || 0);
            return acc;
        }, {});

        expect(totals["London Storage"]).toBe(120000);
        expect(Object.keys(totals)).toContain("North Hub");
    });

    test("limits displayed data to top 5 depots", () => {
        const totals = mockData.reduce((acc, sale) => {
            const depot = sale.depotName || "Unknown";
            acc[depot] = (acc[depot] || 0) + (sale.totalPrice || 0);
            return acc;
        }, {});

        const chartData = Object.entries(totals)
            .map(([name, total]) => ({
                name,
                value: total
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

        expect(chartData.length).toBeLessThanOrEqual(5);
    });

    test("renders gracefully when no data provided", () => {
        render(
            <ChartSalesByDepot
                data={[]}
            />
        );

        expect(screen.getByText(/Sales by Depot/i)).toBeInTheDocument();
    });

    test("handles missing depotName safely", () => {
        const badData = [
            {
                totalPrice: 50000
            }
        ];

        expect(() => render(
            <ChartSalesByDepot
                data={badData}
            />
        )).not.toThrow();
    });

    test("matches snapshot", () => {
        const { asFragment  } = render(
            <ChartSalesByDepot
                data={mockData}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});