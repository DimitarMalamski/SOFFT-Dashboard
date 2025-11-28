import ReactDOM from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SalesModal from "../SalesModal.jsx";

// Make portals render inline during tests
beforeAll(() => {
    ReactDOM.createPortal = (element) => element;
});

describe("SalesModal", () => {
    const people = [
        { name: "Anna" },
        { name: "Bob" },
        { name: "Carlos" },
    ];

    test("renders all salespeople", () => {
        render(<SalesModal people={people} onClose={vi.fn()} />);

        expect(screen.getByText("All Salespeople")).toBeInTheDocument();
        expect(screen.getByText("Anna")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getByText("Carlos")).toBeInTheDocument();
    });

    test("filters results when searching", () => {
        render(<SalesModal people={people} onClose={vi.fn()} />);

        const input = screen.getByPlaceholderText("Search salespeople...");
        fireEvent.change(input, { target: { value: "Ann" } });

        const annaRow = screen.getByText((content, element) => {
            return (
                element.classList.contains("px-2") &&
                element.textContent.replace(/\s+/g, "") === "Anna"
            );
        });

        expect(annaRow).toBeInTheDocument();

        expect(screen.queryByText("Bob")).toBeNull();
        expect(screen.queryByText("Carlos")).toBeNull();
    });

    test("shows 'No results found' when no matches", () => {
        render(<SalesModal people={people} onClose={vi.fn()} />);

        const input = screen.getByPlaceholderText("Search salespeople...");
        fireEvent.change(input, { target: { value: "ZZZ" } });

        expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    test("calls onClose when Close clicked", () => {
        const mockClose = vi.fn();

        render(<SalesModal people={people} onClose={mockClose} />);
        fireEvent.click(screen.getByText("Close"));

        expect(mockClose).toHaveBeenCalledTimes(1);
    });
});
