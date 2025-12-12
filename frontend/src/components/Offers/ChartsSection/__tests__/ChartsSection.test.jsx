import { render, screen } from "@testing-library/react";
import ChartsSection from "../ChartsSection.jsx";
import * as dataUtils from "../../../../utils/offersPage/transformChartData.js";

vi.mock("../charts/StatusChart.jsx", () => ({
    default: ({ data }) => <div data-testid="status-chart" data-length={data.length} />,
}));
vi.mock("../charts/SalespersonChart.jsx", () => ({
    default: ({ data }) => <div data-testid="salesperson-chart" data-length={data.length} />,
}));
vi.mock("../charts/TimelineChart.jsx", () => ({
    default: ({ data }) => <div data-testid="timeline-chart" data-length={data.length} />,
}));

describe("ChartsSection Component", () => {
    const mockTransform = {
        statusCounts: [{ name: "Pending", value: 2 }],
        salesByPerson: [{ name: "Alice", offers: 3 }],
        offersByDate: [{ date: "2025-11-10", offers: 5 }],
    };

    beforeEach(() => {
        vi.spyOn(dataUtils, "transformChartData").mockReturnValue(mockTransform);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders all chart components with data", () => {
        render(<ChartsSection offers={[]} />);
        expect(screen.getByTestId("status-chart")).toBeInTheDocument();
        expect(screen.getByTestId("salesperson-chart")).toBeInTheDocument();
        expect(screen.getByTestId("timeline-chart")).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<ChartsSection offers={[]} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
