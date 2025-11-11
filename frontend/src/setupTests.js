import '@testing-library/jest-dom';

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

// Add a global mock if missing ( Chart rendering )
if (typeof global.ResizeObserver === "undefined") {
    global.ResizeObserver = ResizeObserverMock;
}