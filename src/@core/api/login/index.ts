import axios from 'axios';

interface LoginParams {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginParams) => {
  try {
    const response = await axios.post('/api/superadmin/login', {
      username,
      password,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code outside 2xx range
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      // Something else happened while making the request
      throw new Error(error.message || 'Login failed');
    }
  }
};
