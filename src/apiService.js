import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL || "https://reqres.in/api/";

const apiService = axios.create({
  baseURL: baseURL,
});

export const makeApiRequest = async (method, endpoint, data = null) => {
  try {
    const response = await apiService({
      method: method,
      url: endpoint,
      data: data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
