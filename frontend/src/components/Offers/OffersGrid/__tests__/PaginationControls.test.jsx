import { render, screen, fireEvent } from "@testing-library/react";
import PaginationControls from "../PaginationControls.jsx";

describe("PaginationControls Component", () => {
    const mockNext = vi.fn();
    const mockPrev = vi.fn();

    test("renders current page info", () => {
        render(
            <PaginationControls
                currentPage={1}
                totalPages={3}
                onNext={mockNext}
                onPrev={mockPrev}
            />
        );

        expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
    });

    test("calls onNext and onPrev correctly", () => {
        render(
            <PaginationControls
                currentPage={2}
                totalPages={3}
                onNext={mockNext}
                onPrev={mockPrev}
            />
        );

        fireEvent.click(screen.getByText("← Prev"));
        fireEvent.click(screen.getByText("Next →"));
        expect(mockPrev).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
    });

    test("disables prev on first page and next on last page", () => {
        const { rerender } = render(
            <PaginationControls
                currentPage={1}
                totalPages={3}
                onNext={mockNext}
                onPrev={mockPrev}
            />
        );

        expect(screen.getByText("← Prev")).toBeDisabled();

        rerender(
            <PaginationControls
                currentPage={3}
                totalPages={3}
                onNext={mockNext}
                onPrev={mockPrev}
            />
        );
        expect(screen.getByText("Next →")).toBeDisabled();
    });
});
