import { render, screen } from "@testing-library/react";
import StatusChart from "../StatusChart.jsx";

vi.mock("recharts", () => ({
    PieChart: (props) => <div data-testid="pie-chart">{props.children}</div>,
    Pie: (props) => <div data-testid="pie">{props.children}</div>,
    Cell: (props) => <div data-testid="cell" />,
    Tooltip: () => <div data-testid="tooltip" />,
    ResponsiveContainer: (props) => <div>{props.children}</div>,
}));

describe("StatusChart Component", () => {
    const mockData = [
        { name: "Pending", value: 5 },
        { name: "Approved", value: 3 },
    ];

    test("renders title and chart elements", () => {
        render(<StatusChart data={mockData} />);
        expect(screen.getByText("Offers by Status")).toBeInTheDocument();
        expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
        expect(screen.getAllByTestId("cell")).toHaveLength(2);
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<StatusChart data={mockData} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
