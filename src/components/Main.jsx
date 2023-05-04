import { useState, useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { HiOutlineInformationCircle } from "react-icons/hi";

const Main = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${
          import.meta.env.VITE_MOVIES_API_KEY
        }`
      );
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  //Get a random show from the 10 most popular list
  const randomMovie = movies[Math.floor(Math.random() * 10)];

  //Get the rating position of the tranding movie
  let ratingPosition = movies.indexOf(randomMovie) + 1;

  console.log(movies);
  console.log(randomMovie);
  return (
    <div className="w-full h-[500px]">
      <div className="h-full w-full bg-slate-100 relative">
        <div className="bg-slate-900/70 absolute w-full h-full z-[10]"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`}
          alt=""
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
          <div className="flex gap-4">
            <button className="flex items-center bg-slate-100 text-slate-900 px-4 py-2 rounded-sm">
              <BsFillPlayFill size={25} />
              <span className="text-sm md:text-base">Play</span>
            </button>
            <button className="flex items-center gap-2 bg-[#515250] text-slate-50 px-4 py-2 rounded-sm">
              <HiOutlineInformationCircle
                size={25}
                className="stroke-slate-100"
              />
              <span className="text-sm md:text-base">More Information</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
