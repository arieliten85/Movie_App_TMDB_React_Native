import axios from 'axios';
import {useEffect, useState} from 'react';
import {Credits, Movie, MovieDBResponse, MovieDetailsResponse, MoviesSimilarResponse} from '../interfaces/movieInterface';

import {API_KEY} from '@env';

export const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'es-ES',
  },
});

//function image
export const generateImagePerson = (profilePath: string | null) => (profilePath ? 'https://image.tmdb.org/t/p/w185' + profilePath : null);
export const generateImageURI = (uriImage: string | undefined) => (uriImage ? 'https://image.tmdb.org/t/p/w500' + uriImage : null);

// fallback images
export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

// endpoints
const trendingMoviesEndpoint = '/trending/movie/day';
const upcomingMoviesEndpoint = '/movie/upcoming';
const popularMoviesEndpoint = '/movie/popular';
const topRatedMoviesEndpoint = '/movie/top_rated';

const searchMoviesEndpoint = '/search/movie';

interface IMoviesState {
  trending: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovieDB = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<IMoviesState>({
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    try {
      const trendingPromise = movieDB.get<MovieDBResponse>(trendingMoviesEndpoint);
      const upcomingPromise = movieDB.get<MovieDBResponse>(upcomingMoviesEndpoint);
      const popularPromise = movieDB.get<MovieDBResponse>(popularMoviesEndpoint);
      const topRatedPromise = movieDB.get<MovieDBResponse>(topRatedMoviesEndpoint);

      const [trendingData, popularData, topRatedData, upcomingData] = await Promise.all([
        trendingPromise,
        popularPromise,
        topRatedPromise,
        upcomingPromise,
      ]);

      setMoviesState({
        trending: trendingData.data.results,
        popular: popularData.data.results,
        topRated: topRatedData.data.results,
        upcoming: upcomingData.data.results,
      });
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching movie:', error);
    }
  };
  const getMovieDetails = async (movie_id: number) => {
    try {
      const detailsResponse = await movieDB.get<MovieDetailsResponse>(`/movie/${movie_id}`);

      return detailsResponse.data;
    } catch (error) {
      console.log('Error fetching movie details:', error);
      throw error;
    }
  };
  const getMovieSimilar = async (movie_id: number) => {
    try {
      const similarResponse = await movieDB.get<MoviesSimilarResponse>(`/movie/${movie_id}/similar`);
      return similarResponse;
    } catch (error) {
      console.log('Error fetching movie:', error);
    }
  };
  const searchMovie = async (query: any) => {
    try {
      const response = await movieDB.get<MovieDBResponse>(searchMoviesEndpoint, {
        params: {
          query: query,
        },
      });
      return response;
    } catch (error) {
      console.log('Error fetching movie:', error);
    }
  };

  const getMovieCredits = async (movie_id: number) => {
    try {
      const similarResponse = await movieDB.get<Credits>(`/movie/${movie_id}/credits`);
      return similarResponse.data.cast;
    } catch (error) {
      console.log('Error fetching movie:', error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {...moviesState, isLoading, getMovieDetails, searchMovie, getMovieSimilar, getMovieCredits};
};
