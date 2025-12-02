import { render, screen } from "@testing-library/react";
import SalesChip from "../SalesChip.jsx";

describe("SalesChip", () => {
    test("renders the salesperson name", () => {
        render(<SalesChip name="John Smith" />);
        expect(screen.getByText("John Smith")).toBeInTheDocument();
    });

    test("applies correct styling", () => {
        render(<SalesChip name="John Smith" />);
        const chip = screen.getByText("John Smith");

        expect(chip).toHaveClass(
            "px-2",
            "py-0.5",
            "bg-emerald-800/60",
            "border",
            "border-emerald-700",
            "text-emerald-100",
            "text-xs",
            "rounded-full"
        );
    });
});