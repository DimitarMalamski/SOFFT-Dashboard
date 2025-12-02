import { render, screen, fireEvent } from "@testing-library/react";
import LayoutButton from "../LayoutButton.jsx";
import { BarChart3 } from "lucide-react";

describe("LayoutButton Component", () => {
    test("renders with the correct title and icon", () => {
        render(
            <LayoutButton
                active={false}
                onClick={() => {}}
                title="Charts View"
                icon={BarChart3}
            />
        );

        const button = screen.getByRole("button", { name: /charts view/i });
        expect(button).toBeInTheDocument();
        expect(button.querySelector("svg")).toBeInTheDocument();
    });

    test("calls onClick when clicked", () => {
        const mockClick = vi.fn();
        render(
            <LayoutButton
                active={false}
                onClick={mockClick}
                title="Charts View"
                icon={BarChart3}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /charts view/i }));
        expect(mockClick).toHaveBeenCalledTimes(1);
    });

    test("applies active class when active is true", () => {
        const { rerender } = render(
            <LayoutButton
                active={false}
                onClick={() => {}}
                title="Charts View"
                icon={BarChart3}
            />
        );

        const button = screen.getByRole("button", { name: /charts view/i });
        expect(button.className).toContain("bg-transparent");

        rerender(
            <LayoutButton
                active={true}
                onClick={() => {}}
                title="Charts View"
                icon={BarChart3}
            />
        );

        expect(button.className).toContain("bg-emerald-700/50");
        expect(button.className).toContain("border-emerald-500");
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <LayoutButton
                active={true}
                onClick={() => {}}
                title="Grid View"
                icon={BarChart3}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
