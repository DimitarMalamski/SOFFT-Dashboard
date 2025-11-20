import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ChartSection from "../ChartSection.jsx";

vi.mock("../../Charts/LineChartType", () => ({
    default: (props) => (
        <div data-testid="mock-line-chart" data-props={JSON.stringify(props)} />
    )
}));

vi.mock("../../Charts/BarChartType", () => ({
    default: (props) => (
        <div data-testid="mock-bar-chart" data-props={JSON.stringify(props)} />
    )
}));

describe("ChartSection Component", () => {

    const chartOptions = [
        { label: "Offers Per Salesman", value: "offersPerSalesman", chart: "bar" },
        { label: "Offers Per Country", value: "offersPerCountry", chart: "bar" },
        { label: "Trend Over Time", value: "totalValueOverTime", chart: "line" },
    ];

    const baseData = [
        { salesman: "Anna", count: 5 },
        { salesman: "Ben", count: 7 },
    ];

    test("renders 'No data' message when chartData is empty", () => {
        render(
            <ChartSection
                selectedChart="offersPerSalesman"
                chartOptions={chartOptions}
                chartData={[]}
            />
        );

        expect(screen.getByText("No data to display for this chart.")).toBeInTheDocument();
    });

    test("renders BarChartType for bar charts", () => {
        render(
            <ChartSection
                selectedChart="offersPerSalesman"
                chartOptions={chartOptions}
                chartData={baseData}
            />
        );

        expect(screen.getByTestId("mock-bar-chart")).toBeInTheDocument();
    });

    test("renders LineChartType for line charts", () => {
        render(
            <ChartSection
                selectedChart="totalValueOverTime"
                chartOptions={chartOptions}
                chartData={[
                    { date: "2024-01-01", total: 1000 },
                    { date: "2024-01-02", total: 1500 },
                ]}
            />
        );

        expect(screen.getByTestId("mock-line-chart")).toBeInTheDocument();
    });

    test("passes correct props based on selectedChart", () => {
        render(
            <ChartSection
                selectedChart="offersPerSalesman"
                chartOptions={chartOptions}
                chartData={baseData}
            />
        );

        const bar = screen.getByTestId("mock-bar-chart");
        const props = JSON.parse(bar.getAttribute("data-props"));

        expect(props).toMatchObject({
            data: baseData,
            xKey: "salesman",
            yKey: "count",
            label: "Offers"
        });
    });

    test("renders BarChartType for conversionRate chart", () => {
        render(
            <ChartSection
                selectedChart="conversionRate"
                chartOptions={[
                    ...chartOptions,
                    { label: "Conversion Rate", value: "conversionRate", chart: "bar" }
                ]}
                chartData={[
                    { date: "2024-01-01", rate: 50 },
                    { date: "2024-01-02", rate: 30 },
                ]}
            />
        );

        const bar = screen.getByTestId("mock-bar-chart");
        const props = JSON.parse(bar.getAttribute("data-props"));

        expect(props).toMatchObject({
            data: [
                { date: "2024-01-01", rate: 50 },
                { date: "2024-01-02", rate: 30 },
            ],
            xKey: "date",
            yKey: "rate",
            label: "Conversion Rate (%)",
        });
    });


    test("renders BarChartType for leadTimeAnalysis chart", () => {
        render(
            <ChartSection
                selectedChart="leadTimeAnalysis"
                chartOptions={[
                    ...chartOptions,
                    { label: "Lead Time", value: "leadTimeAnalysis", chart: "bar" }
                ]}
                chartData={[
                    { referenceId: "SO1", leadTime: 3.5 },
                    { referenceId: "SO2", leadTime: 1.2 },
                ]}
            />
        );

        const bar = screen.getByTestId("mock-bar-chart");
        const props = JSON.parse(bar.getAttribute("data-props"));

        expect(props).toMatchObject({
            data: [
                { referenceId: "SO1", leadTime: 3.5 },
                { referenceId: "SO2", leadTime: 1.2 },
            ],
            xKey: "referenceId",
            yKey: "leadTime",
            label: "Lead Time (days)",
        });
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <ChartSection
                selectedChart="offersPerSalesman"
                chartOptions={chartOptions}
                chartData={baseData}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
