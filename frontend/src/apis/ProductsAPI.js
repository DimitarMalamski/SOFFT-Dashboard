import axios from "axios";

const BASE_URL = "http://localhost:8080/api/products";

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
        axios.get(`${BASE_URL}/paged`, {
            params: cleanParams({ page, size, name, class: classType, color })
        }).then(res => res.data),

    getById: (id) =>
        axios.get(`${BASE_URL}/${id}`).then(res => res.data),
};

export default ProductsAPI;

