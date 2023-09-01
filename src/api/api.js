import axios from 'axios';
import { PER_PAGE } from './constans';

const API_KEY = '36836755-9f43607b903fa703cdff42e50';
const API_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, currentPage) => {
  try {
    const response = await axios.get(
      `${API_URL}?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );
    return response.data.hits;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
