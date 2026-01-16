import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL;
const PRODUCTS_BASE_URL = `${BASE_URL}/api/salesoffers/products`;

const cleanParams = (params) => {
    const cleaned = {};
    Object.keys(params).forEach(key => {
        const val = params[key];
        cleaned[key] = val === "" ? null : val;
    });
    return cleaned;
};

const ProductsAPI = {
    getPaged: ({ page = 0, size = 16, name, classType, color }) =>
        axios.get(`${PRODUCTS_BASE_URL}/paged`, {
            params: cleanParams({ page, size, name, class: classType, color })
        }).then(res => res.data),

    getById: (id) =>
        axios.get(`${PRODUCTS_BASE_URL}/${id}`).then(res => res.data),
};

export default ProductsAPI;

