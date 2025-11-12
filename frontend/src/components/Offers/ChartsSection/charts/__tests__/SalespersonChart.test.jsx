import { render, screen } from "@testing-library/react";
import SalespersonChart from "../SalespersonChart.jsx";

vi.mock("recharts", () => ({
    BarChart: (props) => <div data-testid="bar-chart">{props.children}</div>,
    Bar: () => <div data-testid="bar" />,
    CartesianGrid: () => <div data-testid="grid" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    ResponsiveContainer: (props) => <div>{props.children}</div>,
}));

describe("SalespersonChart Component", () => {
    const mockData = [
        { name: "Alice", offers: 3 },
        { name: "Bob", offers: 2 },
    ];

    test("renders title and bar chart", () => {
        render(<SalespersonChart data={mockData} />);
        expect(screen.getByText("Offers per Salesperson")).toBeInTheDocument();
        expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<SalespersonChart data={mockData} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
