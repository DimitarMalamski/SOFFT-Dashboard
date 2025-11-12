import { getStatusColor, getStatusIcon, STATUS_STYLES } from "../offerStatusHelpers.jsx";

describe("offerStatusHelpers", () => {
    test("returns correct color for known status", () => {
        expect(getStatusColor("Pending")).toBe(STATUS_STYLES.Pending.color);
    });

    test("returns default color for unknown status", () => {
        expect(getStatusColor("Unknown")).toBe(STATUS_STYLES.Default.color);
    });

    test("returns correct icon for known status", () => {
        expect(getStatusIcon("Declined")).toEqual(STATUS_STYLES.Declined.icon);
    });

    test("returns null for unknown status", () => {
        expect(getStatusIcon("SomethingElse")).toBe(null);
    });
});