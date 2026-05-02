import axios from 'axios';
import { moodMap } from './moodMap';

export const fetchMoviesByMood = async (mood, language = "en", page = 1) => {
    const genreId = moodMap[mood];
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&with_original_language=${language}&page=${page}`;
    const response = await axios.get(url);
    return  {
      results: response.data.results,
      totalPages: response.data.total_pages
    };
};