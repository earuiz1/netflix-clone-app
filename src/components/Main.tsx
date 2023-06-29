import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import { setGenres } from "../redux/modal_slice";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Main: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresResponse, trendingMoviesRespone] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${
              import.meta.env.VITE_MOVIES_API_KEY
            }`
          ).then((response) => response.json()),
          fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${
              import.meta.env.VITE_MOVIES_API_KEY
            }`
          ).then((response) => response.json()),
        ]);
        dispatch(setGenres(genresResponse.genres));
        setMovies(trendingMoviesRespone.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //Get a random show from the 10 most popular list
  const randomMovie = movies[Math.floor(Math.random() * 10)];

  //Get the rating position of the tranding movie
  let ratingPosition: number = movies?.indexOf(randomMovie) + 1;

  return (
    <div className="w-full h-[500px] mb-8">
      <div className="h-full w-full bg-slate-100 relative">
        <div className="bg-slate-900/70 absolute w-full h-full z-[10]"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`}
          alt={randomMovie?.original_title}
          className="w-full h-full object-cover"
        />
        <div className="flex flex-col absolute top-1/2 transform -translate-y-1/2 gap-4 mx-6 z-[11]">
          <h2 className="text-slate-100 font-bold text-2xl md:text-3xl lg:text-4xl">
            {randomMovie?.original_title}
          </h2>
          <span className="text-slate-100 font-semibold text-lg md:text-xl">
            Top °{ratingPosition}
          </span>
          <span className="text-slate-100 line-clamp-3 text-sm md:text-base w-full md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]">
            {randomMovie?.overview}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Main;
