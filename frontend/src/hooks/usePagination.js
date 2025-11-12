import { useState, useMemo } from "react";

export function usePagination(data = [], itemsPerPage = 4) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goToPage = (page) =>
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));

    return {
        currentPage,
        totalPages,
        currentData,
        nextPage,
        prevPage,
        goToPage,
    };
}
