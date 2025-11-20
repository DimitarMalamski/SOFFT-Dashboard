import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ChartSelector from "../ChartSelector.jsx";

describe("ChartSelector Component", () => {

    const chartOptions = [
        { label: "Sales by Country", value: "sales-country", chart: "bar" },
        { label: "Sales by Brand", value: "sales-brand", chart: "bar" },
        { label: "Sales Trend", value: "sales-trend", chart: "line" },
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

        expect(screen.getByText("Select chart:")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    test("renders all chart options", () => {
        render(
            <ChartSelector
                selectedChart="sales-country"
                setSelectedChart={setSelectedChart}
                chartOptions={chartOptions}
            />
        );

        expect(screen.getByText("Sales by Country")).toBeInTheDocument();
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

        const select = screen.getByRole("combobox");
        expect(select.value).toBe("sales-brand");
    });

    test("calls setSelectedChart when selecting a new option", () => {
        render(
            <ChartSelector
                selectedChart="sales-country"
                setSelectedChart={setSelectedChart}
                chartOptions={chartOptions}
            />
        );

        const select = screen.getByRole("combobox");

        fireEvent.change(select, { target: { value: "sales-trend" } });

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
