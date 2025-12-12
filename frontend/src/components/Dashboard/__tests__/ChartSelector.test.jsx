import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ChartSelector from "../ChartSelector.jsx";

describe("ChartSelector Component", () => {

    const DummyIcon = () => <svg data-testid="icon" />;

    const chartOptions = [
        { label: "Sales by Country", value: "sales-country", chart: "bar", icon: DummyIcon },
        { label: "Sales by Brand", value: "sales-brand", chart: "bar", icon: DummyIcon },
        { label: "Sales Trend", value: "sales-trend", chart: "line", icon: DummyIcon },
    ];

    const setSelectedChart = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders label and dropdown", () => {
        render(
            <ChartSelector
                selectedChart="sales-country"
                setSelectedChart={setSelectedChart}
                chartOptions={chartOptions}
            />
        );

        expect(screen.getByText("Select chart")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("renders all chart options", () => {
        render(
            <ChartSelector
                selectedChart="sales-country"
                setSelectedChart={setSelectedChart}
                chartOptions={chartOptions}
            />
        );

        // open dropdown
        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByText("Sales by Brand")).toBeInTheDocument();
        expect(screen.getByText("Sales Trend")).toBeInTheDocument();
    });

    test("shows the correct selected value", () => {
        render(
            <ChartSelector
                selectedChart="sales-brand"
                setSelectedChart={setSelectedChart}
                chartOptions={chartOptions}
            />
        );

        const selectButton = screen.getByRole("button");

        expect(selectButton).toHaveTextContent("Sales by Brand");
    });

    test("calls setSelectedChart when selecting a new option", () => {
        render(
            <ChartSelector
                selectedChart="sales-country"
                setSelectedChart={setSelectedChart}
                chartOptions={chartOptions}
            />
        );

        fireEvent.click(screen.getByRole("button")); // open dropdown

        fireEvent.click(screen.getByText("Sales Trend")); // click option

        expect(setSelectedChart).toHaveBeenCalledWith("sales-trend");
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <ChartSelector
                selectedChart="sales-country"
                setSelectedChart={setSelectedChart}
                chartOptions={chartOptions}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
