import { render, screen } from "@testing-library/react";
import ConversionsCard from "../ConversionsChart.jsx";

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

describe("ConversionsCard Component", () => {

    test("renders the title", () => {
        render(<ConversionsCard title="Conversion rate" />);
        expect(screen.getByText("Conversion rate")).toBeInTheDocument();
    });

    test("displays the correct percentage", () => {
        render(<ConversionsCard wins={25} total={50} />);
        expect(screen.getByText("50%")).toBeInTheDocument();
    });

    test("shows ↑ for positive delta", () => {
        render(
            <ConversionsCard
                wins={60} total={100}
                prevWins={40} prevTotal={100}
            />
        );

        const delta = screen.getByTitle("Change vs previous");
        expect(delta.textContent).toContain("↑");
    });

    test("shows ↓ for negative delta", () => {
        render(
            <ConversionsCard
                wins={20} total={100}
                prevWins={40} prevTotal={100}
            />
        );

        const delta = screen.getByTitle("Change vs previous");
        expect(delta.textContent).toContain("↓");
    });

    test("shows → when rate stays the same", () => {
        render(
            <ConversionsCard
                wins={30} total={100}
                prevWins={30} prevTotal={100}
            />
        );

        const delta = screen.getByTitle("Change vs previous");
        expect(delta.textContent).toContain("→");
    });

    test("shows — when previous data is missing", () => {
        render(<ConversionsCard wins={30} total={100} />);
        expect(screen.getByTitle("Change vs previous").textContent).toBe("—");
    });

    test("renders correct converted label", () => {
        render(<ConversionsCard wins={15} total={20} />);
        expect(screen.getByText("15/20 converted")).toBeInTheDocument();
    });

    test("renders the pie chart svg", () => {
        render(<ConversionsCard wins={10} total={20} />);

        const svg = document.querySelector("svg");
        expect(svg).not.toBeNull();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<ConversionsCard wins={10} total={20} />);
        expect(asFragment()).toMatchSnapshot();
    });

});
