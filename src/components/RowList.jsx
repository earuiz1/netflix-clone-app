import { useState, useEffect, useRef } from "react";
import Movie from "./Movie";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const RowList = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const rowSliderRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  const slideToLeft = () => {
    rowSliderRef.current.scrollLeft -= 300;
  };

  const slideToRight = () => {
    rowSliderRef.current.scrollLeft += 300;
  };

  console.log("Rendering rows");

  return (
    <>
      <h3 className="text-slate-100 text-lg font-bold px-6 my-2 ">{title}</h3>
      <div className="relative flex w-full h-[250px] pl-6 group mb-6">
        <div
          ref={rowSliderRef}
          className="flex overflow-x-scroll scrollbar-hide scroll-smooth gap-3"
        >
          <AiOutlineArrowLeft
            className="hidden group-hover:block absolute bg-slate-50 opacity-60 hover:opacity-100 text-slate-900 rounded-full top-1/2 transform -translate-y-1/2 p-2 z-[20]"
            size={40}
            onClick={slideToLeft}
          />
          {movies.map((movie) => {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie?.title}
                backDropPath={movie?.backdrop_path}
                overview={movie?.overview}
                releaseDate={movie?.release_date}
                language={movie?.original_language}
                genresIDs={movie?.genre_ids}
              />
            );
          })}
          <AiOutlineArrowRight
            className="hidden group-hover:block absolute bg-slate-50 opacity-60 hover:opacity-100 text-slate-900 rounded-full top-1/2 right-0 transform -translate-y-1/2 p-2 z-[20] "
            size={40}
            onClick={slideToRight}
          />
        </div>
      </div>
    </>
  );
};

export default RowList;
