import { useState, useMemo } from "react";

export function usePagination(data = [], rowsPerPage = 3) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return data.slice(start, start + rowsPerPage);
    }, [data, currentPage, rowsPerPage]);

    const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const resetPage = () => setCurrentPage(1);

    return {
        currentPage,
        totalPages,
        currentData,
        nextPage,
        prevPage,
        resetPage
    };
}