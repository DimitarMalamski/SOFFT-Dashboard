import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CompactMultiSelect from "../CompactMultiSelect.jsx";

describe("CompactMultiSelect Component", () => {
    const mockOnChange = vi.fn();
    const options = ["Option A", "Option B", "Option C"];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders label and default display value", () => {
        render(
            <CompactMultiSelect
                label="Test Label"
                options={options}
                selected={[]}
                onChange={mockOnChange}
            />
        );

        expect(screen.getByText("Test Label")).toBeInTheDocument();
        expect(screen.getByText("All")).toBeInTheDocument();
    });

    test("opens dropdown when clicked", () => {
        render(
            <CompactMultiSelect
                label="Test Label"
                options={options}
                selected={[]}
                onChange={mockOnChange}
            />
        );

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
        expect(screen.getByText("Option A")).toBeInTheDocument();
        expect(screen.getByText("Option B")).toBeInTheDocument();
        expect(screen.getByText("Option C")).toBeInTheDocument();
    });

    test("filters options using the search input", () => {
        render(
            <CompactMultiSelect
                label="Test Label"
                options={options}
                selected={[]}
                onChange={mockOnChange}
            />
        );

        fireEvent.click(screen.getByRole("button"));

        const searchInput = screen.getByPlaceholderText("Search...");
        fireEvent.change(searchInput, { target: { value: "B" } });

        expect(screen.getByText("Option B")).toBeInTheDocument();
        expect(screen.queryByText("Option A")).not.toBeInTheDocument();
        expect(screen.queryByText("Option C")).not.toBeInTheDocument();
    });

    test("shows 'No results' when search yields none", () => {
        render(
            <CompactMultiSelect
                label="Test Label"
                options={options}
                selected={[]}
                onChange={mockOnChange}
            />
        );

        fireEvent.click(screen.getByRole("button"));

        fireEvent.change(screen.getByPlaceholderText("Search..."), {
            target: { value: "XYZ" }
        });

        expect(screen.getByText("No results")).toBeInTheDocument();
    });

    test("toggles option selection", () => {
        render(
            <CompactMultiSelect
                label="Test Label"
                options={options}
                selected={[]}
                onChange={mockOnChange}
            />
        );

        fireEvent.click(screen.getByRole("button"));

        fireEvent.click(screen.getByText("Option A"));

        expect(mockOnChange).toHaveBeenCalledWith(["Option A"]);
    });

    test("removes option when clicking again if already selected", () => {
        render(
            <CompactMultiSelect
                label="Test Label"
                options={options}
                selected={["Option B"]}
                onChange={mockOnChange}
            />
        );

        fireEvent.click(screen.getByRole("button"));

        fireEvent.click(screen.getByText("Option B"));

        expect(mockOnChange).toHaveBeenCalledWith([]);
    });

    test("shows 'N selected' when multiple options chosen", () => {
        render(
            <CompactMultiSelect
                label="Test Label"
                options={options}
                selected={["Option A", "Option C"]}
                onChange={mockOnChange}
            />
        );

        expect(screen.getByText("2 selected")).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(
            <CompactMultiSelect
                label="Test Label"
                options={options}
                selected={["Option A"]}
                onChange={mockOnChange}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
