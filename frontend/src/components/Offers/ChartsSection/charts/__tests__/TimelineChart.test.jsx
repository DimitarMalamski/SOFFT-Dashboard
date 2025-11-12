import { render, screen } from "@testing-library/react";
import TimelineChart from "../TimelineChart.jsx";

vi.mock("recharts", () => ({
    LineChart: (props) => <div data-testid="line-chart">{props.children}</div>,
    Line: () => <div data-testid="line" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    ResponsiveContainer: (props) => <div>{props.children}</div>,
}));

describe("TimelineChart Component", () => {
    const mockData = [
        { date: "2025-11-10", offers: 3 },
        { date: "2025-11-11", offers: 5 },
    ];

    test("renders title and line chart", () => {
        render(<TimelineChart data={mockData} />);
        expect(screen.getByText("Offers Over Time")).toBeInTheDocument();
        expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<TimelineChart data={mockData} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
