import { render, screen } from "@testing-library/react";
import SalesTrendChart from "../SalesTrendChart.jsx";
import ConversionsCard from "../ConversionsChart.jsx";

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

describe("SalesTrendChart", () => {
    test("renders the title", () => {
        render(<SalesTrendChart title="Orders (last 7 days)" />);
        expect(screen.getByText("Orders (last 7 days)")).toBeInTheDocument();
    });

    test("uses default points when none are provided", () => {
        render(<SalesTrendChart />);
        expect(screen.getByText("Mon")).toBeInTheDocument();
        expect(screen.getByText("Tue")).toBeInTheDocument();
        expect(screen.getByText("Wed")).toBeInTheDocument();
    });

    test("formats the main displayed number correctly", () => {
        const mockPoints = [
            { label: "Mon", value: 1000 },
            { label: "Tue", value: 2500 },
        ];

        render(<SalesTrendChart points={mockPoints} />);

        expect(screen.getByText("2.5K")).toBeInTheDocument();
    });

    test("shows a positive delta ↑ when trend increases", () => {
        const mockPoints = [
            { label: "Mon", value: 100 },
            { label: "Tue", value: 200 },
        ];

        render(<SalesTrendChart points={mockPoints} />);

        expect(screen.getByLabelText("delta vs previous point")).toHaveTextContent("↑");
    });

    test("shows a negative delta ↓ when trend decreases", () => {
        const mockPoints = [
            { label: "Mon", value: 200 },
            { label: "Tue", value: 100 },
        ];

        render(<SalesTrendChart points={mockPoints} />);

        expect(screen.getByLabelText("delta vs previous point")).toHaveTextContent("↓");
    });

    test("shows a dash — when only one point exists", () => {
        const mockPoints = [{ label: "Mon", value: 123 }];

        render(<SalesTrendChart points={mockPoints} />);

        expect(screen.getByLabelText("delta vs previous point")).toHaveTextContent("—");
    });

    test("renders the chart (svg element)", () => {
        const mockPoints = [
            { label: "Mon", value: 100 },
            { label: "Tue", value: 200 },
        ];

        render(<SalesTrendChart points={mockPoints} />);

        const svg = document.querySelector("svg");
        expect(svg).not.toBeNull();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<SalesTrendChart />);
        expect(asFragment()).toMatchSnapshot();
    });
});
