import { render, screen, fireEvent } from "@testing-library/react";
import SalesList from "../SalesList.jsx";

describe("SalesList (integration)", () => {
    const people = [
        { name: "Anna" },
        { name: "Bob" },
        { name: "Carlos" },
        { name: "Diana" },
    ];

    test("shows N/A when list is empty", () => {
        render(<SalesList people={[]} />);
        expect(screen.getByText("N/A")).toBeInTheDocument();
    });

    test("shows inline preview with chips", () => {
        render(<SalesList people={people} limit={2} />);

        expect(screen.getByText("Anna")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getByText("+2")).toBeInTheDocument();
    });

    test("opens modal when +X is clicked", () => {
        render(<SalesList people={people} limit={2} />);

        fireEvent.click(screen.getByText("+2"));

        expect(screen.getByText("All Salespeople")).toBeInTheDocument();
        expect(screen.getByText("Carlos")).toBeInTheDocument();
    });

    test("closes modal when clicking Close button", () => {
        render(<SalesList people={people} limit={2} />);

        fireEvent.click(screen.getByText("+2"));
        fireEvent.click(screen.getByText("Close"));

        expect(screen.queryByText("All Salespeople")).toBeNull();
    });
});
