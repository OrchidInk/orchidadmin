import axios, { AxiosError } from 'axios';

const BASE_URL = 'https://api.orchid.mn/api/v1/superadmin/subCategory';
const BASE_URLs = 'https://api.orchid.mn/api/v1/superadmin/category';

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

export const deleteSubCategoryEn = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/deleteEn/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to delete English subcategory:', error);
    throw error;
  }
};

/**
 * Delete a subcategory in Mongolian
 * @param subCategoryId - ID of the subcategory to delete
 */
export const deleteSubCategoryMn = async (subCategoryId: number) => {
  try {
    await axios.delete(`${BASE_URL}/deleteMn/${subCategoryId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to delete Mongolian subcategory:', error);
    throw error;
  }
};

export const updateSubCategoryEn = async (id: number, subCategoryNameEn: string) => {
  if (!id) {
    console.error("updateSubCategoryEn was called with an undefined ID!");
    throw new Error("SubCategory ID is required.");
  }

  try {
    console.log(`Updating English subcategory with ID: ${id}`); // Debugging
    const response = await axios.patch(`${BASE_URL}/updateEn/${id}`, {
      subCategoryNameEn,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update English subcategory:', error);
    throw error;
  }
};



/**
 * Update a subcategory in Mongolian
 * @param subCategoryId - ID of the subcategory to update
 * @param subCategoryNameMn - New subcategory name in Mongolian
 */
export const updateSubCategoryMn = async (id: number | undefined, subCategoryNameMn: string) => {
  if (!id) {
    console.error("updateSubCategoryMn was called with an undefined ID!");
    throw new Error("SubCategory ID is required.");
  }

  try {
    console.log(`Updating Mongolian subcategory with ID: ${id}`); // Debugging
    const response = await axios.patch(`${BASE_URL}/updateMn/${id}`, {
      subCategoryNameMn, // Removed `id` from body to prevent conflicts
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update Mongolian subcategory:", error);
    throw error;
  }
};
