import axios from "axios";

const API_KEY = '295096109ffa46fab8a01608252101'
const WEATHER_API_URL = 'http://api.weatherapi.com/v1';


const fetchWeather = async (location) => {
  if (!API_KEY) {
    
    throw new Error('Missing API key. Please check .env file.');
  }

  try {
    const API_URL = `${WEATHER_API_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}`
    const res = await axios.get(API_URL);

    return res.data
  } catch (err) {
    
    if (err.response) {

      throw new Error(`API Error: ${err.response.status} - ${err.response.data.error?.message || 'Unknown error'}`)
    } else if (err.request) {

      throw new Error('Network Error: Unable to reach the weather API.');
    } else {

      throw new Error(`Unexpected Error: ${err.message}`)
    }
  }
};

export default fetchWeather;
