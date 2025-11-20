import { render, screen, fireEvent } from "@testing-library/react";
import MultiSelectDropdown from "../MultiSelectDropdown.jsx";

describe("MultiSelectDropdown", () => {
    const options = ["Anna", "Bob", "Carlos", "Diana"];

    const renderDropdown = (props = {}) => {
        const defaultProps = {
            label: "Salesperson",
            options,
            selected: [],
            onChange: vi.fn(),
        };
        return render(<MultiSelectDropdown {...defaultProps} {...props} />);
    };

    test("renders label and closed dropdown", () => {
        renderDropdown();

        expect(screen.getByText("Salesperson")).toBeInTheDocument();
        expect(screen.getByText("All")).toBeInTheDocument();
    });

    test("opens dropdown when clicked", () => {
        renderDropdown();

        fireEvent.click(screen.getByText("All"));

        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    test("closes dropdown when clicking outside", () => {
        renderDropdown();

        fireEvent.click(screen.getByText("All"));
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();

        fireEvent.mouseDown(document.body);

        expect(screen.queryByPlaceholderText("Search...")).toBeNull();
    });

    test("filters options when typing in search", () => {
        renderDropdown();

        fireEvent.click(screen.getByText("All"));
        const input = screen.getByPlaceholderText("Search...");

        fireEvent.change(input, { target: { value: "An" } });

        expect(screen.getByText("Anna")).toBeInTheDocument();
        expect(screen.queryByText("Diana")).toBeInTheDocument();

        expect(screen.queryByText("Carlos")).toBeNull();
        expect(screen.queryByText("Bob")).toBeNull();
    });

    test("shows 'No results' for non-matching search", () => {
        renderDropdown();

        fireEvent.click(screen.getByText("All"));
        const input = screen.getByPlaceholderText("Search...");

        fireEvent.change(input, { target: { value: "ZZZ" } });

        expect(screen.getByText("No results")).toBeInTheDocument();
    });

    test("calls onChange when selecting an option", () => {
        const onChange = vi.fn();
        renderDropdown({ onChange });

        fireEvent.click(screen.getByText("All"));

        const checkbox = screen.getByLabelText("Anna");
        fireEvent.click(checkbox);

        expect(onChange).toHaveBeenCalledWith(["Anna"]);
    });

    test("calls onChange when unselecting an option", () => {
        const onChange = vi.fn();

        renderDropdown({
            selected: ["Anna"],
            onChange,
        });

        fireEvent.click(screen.getByText("1 selected"));
        const checkbox = screen.getByLabelText("Anna");

        fireEvent.click(checkbox);

        expect(onChange).toHaveBeenCalledWith([]);
    });

    test("displays 'N selected' when options are chosen", () => {
        renderDropdown({
            selected: ["Anna", "Bob"],
        });

        expect(screen.getByText("2 selected")).toBeInTheDocument();
    });
});
