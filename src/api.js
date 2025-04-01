import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = (type) => {
  return axios.get(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=1`);
};

export const fetchMovieDetail = (id) => {
  return axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
};

export const fetchMovieCast = (id) => {
  return axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
};

export const searchMovies = (query) => {
  return axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`);
};

// Fetch genres list
export const fetchGenres = async () => {
  return axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
};
