import { render, screen, fireEvent } from "@testing-library/react";
import InlinePreview from "../InlinePreview.jsx";

describe("InlinePreview", () => {
    const people = [
        { name: "Anna" },
        { name: "Bob" },
        { name: "Carlos" },
        { name: "Diana" },
    ];

    test("renders visible chips based on limit", () => {
        render(<InlinePreview people={people} limit={2} onOpen={vi.fn()} />);

        expect(screen.getByText("Anna")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();

        expect(screen.queryByText("Carlos")).toBeNull();
        expect(screen.queryByText("Diana")).toBeNull();
    });

    test("renders +X button when hidden people exist", () => {
        render(<InlinePreview people={people} limit={2} onOpen={vi.fn()} />);
        expect(screen.getByText("+2")).toBeInTheDocument();
    });

    test("does not render +X when no hidden people", () => {
        render(<InlinePreview people={people} limit={4} onOpen={vi.fn()} />);
        expect(screen.queryByText(/\+\d/)).toBeNull();
    });

    test("calls onOpen when +X button is clicked", () => {
        const mockOpen = vi.fn();
        render(<InlinePreview people={people} limit={2} onOpen={mockOpen} />);

        fireEvent.click(screen.getByText("+2"));

        expect(mockOpen).toHaveBeenCalledTimes(1);
    });
});
