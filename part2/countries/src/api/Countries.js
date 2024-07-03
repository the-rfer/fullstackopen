import axios from 'axios';

const COUNTRY_ALL_URL = import.meta.env.VITE_COUNTRY_ALL_URL;
const COUNTRY_QUERY_URL = import.meta.env.VITE_COUNTRY_QUERY_URL;
const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getAll = () =>
    axios
        .get(COUNTRY_ALL_URL)
        .then((res) => {
            const countryArray = res.data.map((country) => {
                return {
                    name: country.name.common,
                };
            });
            return Promise.resolve(countryArray);
        })
        .catch((error) => {
            return Promise.reject(error);
        });

const getSpecific = (country) =>
    axios
        .get(`${COUNTRY_QUERY_URL}${country}`)
        .then((res) => {
            return Promise.resolve(res.data);
        })
        .catch((error) => {
            return Promise.reject(error);
        });

const getWeather = (lat, lon) =>
    axios
        .get(
            `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
        )
        .then((res) => {
            return Promise.resolve(res.data);
        })
        .catch((error) => {
            return Promise.reject(error);
        });

export default { getAll, getSpecific, getWeather };
