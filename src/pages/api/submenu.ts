import axios, { AxiosError } from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/superadmin/subCategory';
const BASE_URLs = 'http://localhost:8000/api/v1/superadmin/category';

const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

const handleUnauthorized = (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
        // Redirect to login page or show login modal
        alert("Session expired. Please login again.");
        window.location.href = '/login'; // Replace '/login' with your login route
    }
    throw error;
};

// Fetch Categories in Mongolian
export const fetchCategoriesMn = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Token not found.');
        }
        const response = await axios.get(`${BASE_URLs}/listMn`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleUnauthorized(error);
        } else {
            throw error;
        }
    }
};

// Fetch Categories in English
export const fetchCategoriesEn = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Token not found.');
        }
        const response = await axios.get(`${BASE_URLs}/listEn`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleUnauthorized(error);
        } else {
            throw error;
        }
    }
};

// Add SubCategory in English
export const addSubCategoryEn = async (subCategoryNameEn: string, categoryEnId: number) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Token not found.');
        }
        await axios.post(
            `${BASE_URL}/createEn`,
            { subCategoryNameEn, categoryEnId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleUnauthorized(error);
        } else {
            throw error;
        }
    }
};

// Add SubCategory in Mongolian
export const addSubCategoryMn = async (subCategoryNameMn: string, categoryMnId: number) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Token not found.');
        }
        await axios.post(
            `${BASE_URL}/createMn`,
            { subCategoryNameMn, categoryMnId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleUnauthorized(error);
        } else {
            throw error;
        }
    }
};

// Fetch SubCategories in English
export const fetchSubCategoriesEn = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Token not found.');
        }
        const response = await axios.get(`${BASE_URLs}/listEn`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleUnauthorized(error);
        } else {
            throw error;
        }
    }
};

// Fetch SubCategories in Mongolian
export const fetchSubCategoriesMn = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Token not found.');
        }
        const response = await axios.get(`${BASE_URLs}/listMn`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleUnauthorized(error);
        } else {
            throw error;
        }
    }
};
