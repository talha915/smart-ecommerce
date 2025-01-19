import axios from 'axios';

export const fetchFlipkartData = async (query) => {
  try {
    const response = await axios.get(`http://localhost:8000/scrape-flipkart?query=${query}`);
    return response.data; // Assuming the API returns JSON data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
