import { useRef, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../fireabase";
import useAuth from "../custom-hooks/useAuth";

const AccountContent = () => {
  const rowSliderRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${currentUser.uid}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [currentUser?.uid]);

  const slideToLeft = () => {
    rowSliderRef.current.scrollLeft -= 300;
  };

  const slideToRight = () => {
    rowSliderRef.current.scrollLeft += 300;
  };

  return (
    <>
      <h3 className="text-slate-100 text-lg font-bold px-6 my-2 ">
        My Favorites
      </h3>
      <div className="relative flex w-full h-[250px] pl-6 group mb-6">
        <div
          ref={rowSliderRef}
          className="flex overflow-x-scroll scrollbar-hide scroll-smooth gap-3"
        >
          {movies.map((movie) => {
            return (
              <div className="relative h-full max-w-[200px]" key={movie.id}>
                <div className="absolute bg-slate-950 opacity-0 hover:opacity-90 w-full h-full z-[12] cursor-pointer">
                  <div className="flex flex-col justify-evenly items-center w-full h-full">
                    <h4 className="text-center text-sm font-medium text-slate-100 w-[80%]">
                      {movie.title}
                    </h4>
                  </div>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.backDropPath}`}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
          <AiOutlineArrowLeft
            className="hidden group-hover:block absolute bg-slate-50 opacity-60 hover:opacity-100 text-slate-900 rounded-full top-1/2 transform -translate-y-1/2 p-2 z-[20]"
            size={40}
            onClick={slideToLeft}
          />
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

export default AccountContent;
