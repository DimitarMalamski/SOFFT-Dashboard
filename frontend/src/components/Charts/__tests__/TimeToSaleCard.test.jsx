import { render, screen } from "@testing-library/react";
import TimeToSaleCard from "../TimeToSaleChart.jsx";
import { vi } from "vitest";

// Mock ResizeObserver (required)
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

vi.mock("@mui/x-charts/LineChart", () => ({
    LineChart: () => <div data-testid="mock-line-chart" />
}));

describe("TimeToSaleCard Component", () => {

    test("renders the title", () => {
        render(<TimeToSaleCard title="Avg time to sale" />);
        expect(screen.getByText("Avg time to sale")).toBeInTheDocument();
    });

    test("displays correct average based on points", () => {
        const mockPoints = [
            { label: "D1", value: 10 },
            { label: "D2", value: 20 },
            { label: "D3", value: 30 },
        ];

        render(<TimeToSaleCard points={mockPoints} />);
        expect(screen.getByText("20.0d")).toBeInTheDocument();
    });

    test("shows ↑ when avg > prevAvg", () => {
        const mockPoints = [
            { label: "D1", value: 10 },
            { label: "D2", value: 20 },
        ];

        render(<TimeToSaleCard points={mockPoints} prevAvg={10} />);

        const delta = screen.getByTitle("Change vs previous");
        expect(delta.textContent).toContain("↑");
    });

    test("shows ↓ when avg < prevAvg", () => {
        const mockPoints = [
            { label: "D1", value: 5 },
            { label: "D2", value: 5 },
        ];

        render(<TimeToSaleCard points={mockPoints} prevAvg={10} />);
        const delta = screen.getByTitle("Change vs previous");

        expect(delta.textContent).toContain("↓");
    });

    test("shows → when avg === prevAvg", () => {
        const mockPoints = [
            { label: "D1", value: 10 },
            { label: "D2", value: 10 },
        ];

        render(<TimeToSaleCard points={mockPoints} prevAvg={10} />);
        const delta = screen.getByTitle("Change vs previous");

        expect(delta.textContent).toContain("→");
    });

    test("shows — when prevAvg is missing", () => {
        render(<TimeToSaleCard />);
        const delta = screen.getByTitle("Change vs previous");

        expect(delta.textContent).toBe("—");
    });

    test("renders the mocked LineChart", () => {
        render(<TimeToSaleCard />);
        expect(screen.getByTestId("mock-line-chart")).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<TimeToSaleCard />);
        expect(asFragment()).toMatchSnapshot();
    });

});
