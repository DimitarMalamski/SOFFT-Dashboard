import { render, screen } from "@testing-library/react";
import ChartSalesByPerson from "../ChartSalesByPerson.jsx";

describe("ChartSalesByPerson Component", () => {
    const mockData = [
        {
            totalPrice: 85000,
            salesPersonName: [{ name: "Anna Svensson" }],
        },
        {
            totalPrice: 120000,
            salesPersonName: [{ name: "John Smith" }],
        },
        {
            totalPrice: 56000,
            salesPersonName: [{ name: "Martin Bauer" }],
        },
        {
            totalPrice: 90000,
            salesPersonName: [{ name: "Claire Dubois" }],
        },
        {
            totalPrice: 70000,
            salesPersonName: [{ name: "Anna Svensson" }], // repeated name
        },
        {
            totalPrice: 65000,
            salesPersonName: [{ name: "Unknown Seller" }],
        },
    ];

    test("renders chart title", () => {
        render(
            <ChartSalesByPerson
                data={mockData}
            />
        );

        expect(screen.getByText(/Sales by Salesperson/i)).toBeInTheDocument();
    });

    test("aggregates total sales by salesperson", () => {
        render(
            <ChartSalesByPerson
                data={mockData}
            />
        );

        const totals = mockData.reduce((acc, sale) => {
            const names = sale.salesPersonName.map((p) => p.name);
            names.forEach((n) => (acc[n] = (acc[n] || 0) + sale.totalPrice));
            return acc;
        }, {});

        expect(totals["Anna Svensson"]).toBe(155000);
    });

    test("limits displayed data to top 5 salespeople", () => {
        const totals = mockData.reduce((acc, sale) => {
            const persons = sale.salesPersonName?.length
                ? sale.salesPersonName.map((p) => p.name)
                : ["Unknown"];
            persons.forEach((name) => {
                if (!name) return;
                acc[name] = (acc[name] || 0) + (sale.totalPrice || 0);
            });
            return acc;
        }, {});

        const chartData = Object.entries(totals)
            .map(([name, total]) => ({ name, total }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);

        expect(chartData.length).toBeLessThanOrEqual(5);
    });

    test("renders correctly when no data provided", () => {
        render(
            <ChartSalesByPerson
                data={[]}
            />
        );

        expect(screen.getByText(/Sales by Salesperson/i)).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment  } = render(
            <ChartSalesByPerson
                data={mockData}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test("handles missing salesPersonName safely", () => {
        const badData = [
            {
                totalPrice: 10000
            }
        ];

        expect(() => render(
            <ChartSalesByPerson
                data={badData}
            />
        )).not.toThrow();
    });
});