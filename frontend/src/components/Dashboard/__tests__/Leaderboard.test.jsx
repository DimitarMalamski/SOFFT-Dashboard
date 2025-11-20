import { render, screen } from "@testing-library/react";
import Leaderboard from "../Leaderboard.jsx";

describe("Leaderboard Component", () => {
    const mockSalesData = [
        { salesman: "Alice", count: 12 },
        { salesman: "Bob", count: 9 },
        { salesman: "Charlie", count: 7 },
        { salesman: "David", count: 5 },
    ];

    test("renders the title", () => {
        render(<Leaderboard salesmanData={mockSalesData} />);

        expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    });

    test("renders all salesmen with their counts", () => {
        render(<Leaderboard salesmanData={mockSalesData} />);

        expect(screen.getByText("Alice (12)")).toBeInTheDocument();
        expect(screen.getByText("Bob (9)")).toBeInTheDocument();
        expect(screen.getByText("Charlie (7)")).toBeInTheDocument();
        expect(screen.getByText("David (5)")).toBeInTheDocument();
    });

    test("renders rank numbers correctly", () => {
        render(<Leaderboard salesmanData={mockSalesData} />);

        const ranks = screen.getAllByText(/^[1-4]$/);
        expect(ranks[0]).toHaveTextContent("1");
        expect(ranks[1]).toHaveTextContent("2");
        expect(ranks[2]).toHaveTextContent("3");
        expect(ranks[3]).toHaveTextContent("4");
    });

    test("applies correct medal colors for top 3", () => {
        render(<Leaderboard salesmanData={mockSalesData} />);

        const ranks = screen.getAllByText(/^[1-4]$/);

        expect(ranks[0].className).toContain("text-yellow-400");
        expect(ranks[1].className).toContain("text-gray-300");
        expect(ranks[2].className).toContain("text-amber-600");
        expect(ranks[3].className).toContain("text-white");
    });

    test("renders correct avatar initials", () => {
        render(<Leaderboard salesmanData={mockSalesData} />);

        expect(screen.getByText("A")).toBeInTheDocument();
        expect(screen.getByText("B")).toBeInTheDocument();
        expect(screen.getByText("C")).toBeInTheDocument();
        expect(screen.getByText("D")).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <Leaderboard salesmanData={mockSalesData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
