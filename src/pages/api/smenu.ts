import axios, { AxiosError } from 'axios';

const BASE_URL = 'https://api.orchid.mn/api/v1/superadmin/sCategory';
const BASE_URLs = 'https://api.orchid.mn/api/v1/superadmin/subCategory';

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

export const fetchSCategoriesEn = async () => {
    try {
        const token = getToken()
        if (!token) {
            throw new Error('Token not found')
        }
        const response = await axios.get(`${BASE_URL}/listEn`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleUnauthorized(error);
        } else {
            throw error
        }
    }
}

export const fetchSCategoriesMn = async () => {
    try {
        const token = getToken()
        if (!token) {
            throw new Error('Token not found')
        }
        const response = await axios.get(`${BASE_URL}/listMn`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleUnauthorized(error)
        } else {
            throw error
        }
    }
}

export const AddSCategoryMn = async (sCategoryName: string, subCategoryIDMn: number) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Token not found');
        }
        await axios.post(`${BASE_URL}/createMn`, {
            sCategoryName, subCategoryIDMn
        }, {
            headers: {Authorization: `Bearer ${token}`}
        })
    } catch(error) {
        if (axios.isAxiosError(error)) {
            handleUnauthorized(error);
        } else {
            throw error;
        }
    }
}

export const addSCategoryEn = async(sCategoryNameEn: string, subCategoryIDEn: number) => {
    try {
        const token = getToken()
        if (!token) {
            throw new Error('Token not found')
        }
        await axios.post(`${BASE_URL}/createEn`, {
            sCategoryNameEn, subCategoryIDEn
        }, {headers: {Authorization: `Bearer ${token}`}})
    } catch(error) {
        if (axios.isAxiosError(error)) {
            handleUnauthorized(error)
        } else {
            throw error;
        }
    }
}