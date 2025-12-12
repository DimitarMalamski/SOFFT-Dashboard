import { useEffect, useState } from "react";
import ProductsAPI from "../../apis/ProductsAPI";

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        name: "",
        classType: "",
        color: ""
    });

    const [page, setPage] = useState(0);
    const size = 16;

    const [hasMore, setHasMore] = useState(true);

    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    // Debounce filters
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(0);              // Reset page when filters change
        }, 300);

        return () => clearTimeout(timeout);
    }, [filters]);

    useEffect(() => {
        setLoading(true);

        const clean = (v) => (v === "" ? null : v);

        ProductsAPI.getPaged({
            page,
            size,
            name: clean(debouncedFilters.name),
            classType: clean(debouncedFilters.classType),
            color: clean(debouncedFilters.color)
        })
            .then(data => {
                if (page === 0) {
                    setProducts(data.content);
                } else {
                    setProducts(prev => [...prev, ...data.content]);
                }

                setHasMore(!data.last);
            })
            .catch(setError)
            .finally(() => setLoading(false));

    }, [debouncedFilters, page]);


    const loadMore = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    return {
        products,
        loading,
        error,
        setFilters,
        loadMore,
        hasMore
    };
}
