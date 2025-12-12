import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CompactSingleSelect from "../CompactSingleSelect.jsx";

describe("CompactSingleSelect Component", () => {
    const mockOnChange = vi.fn();
    const options = ["Option A", "Option B", "Option C"];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders label and default selected value", () => {
        render(
            <CompactSingleSelect
                label="Test Label"
                options={options}
                selected=""
                onChange={mockOnChange}
            />
        );

        expect(screen.getByText("Test Label")).toBeInTheDocument();
        expect(screen.getByText("All")).toBeInTheDocument();
    });

    test("opens dropdown when clicked", () => {
        render(
            <CompactSingleSelect
                label="Test Label"
                options={options}
                selected=""
                onChange={mockOnChange}
            />
        );

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(screen.getByText("Option A")).toBeInTheDocument();
        expect(screen.getByText("Option B")).toBeInTheDocument();
        expect(screen.getByText("Option C")).toBeInTheDocument();
    });

    test("calls onChange when selecting an option", () => {
        render(
            <CompactSingleSelect
                label="Test Label"
                options={options}
                selected=""
                onChange={mockOnChange}
            />
        );
        fireEvent.click(screen.getByRole("button"));

        fireEvent.click(screen.getByText("Option B"));

        expect(mockOnChange).toHaveBeenCalledWith("Option B");
    });

    test("closes dropdown after selecting an option", () => {
        render(
            <CompactSingleSelect
                label="Test Label"
                options={options}
                selected=""
                onChange={mockOnChange}
            />
        );

        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText("Option C"));

        expect(screen.queryByText("Option A")).not.toBeInTheDocument();
    });

    test("shows selected option with checkmark indicator", () => {
        render(
            <CompactSingleSelect
                label="Test Label"
                options={options}
                selected="Option B"
                onChange={mockOnChange}
            />
        );

        fireEvent.click(screen.getByRole("button"));

        const indicator = screen.getByText("●");
        expect(indicator).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <CompactSingleSelect
                label="Test Label"
                options={options}
                selected="Option A"
                onChange={mockOnChange}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
