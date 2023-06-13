import { useRef, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../fireabase";
import useAuth from "../custom-hooks/useAuth";

const AccountContent = () => {
  const rowSliderRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${currentUser?.uid}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [currentUser?.uid]);

  const deleteFavorite = async (id) => {
    try {
      //Reference to users
      const ref = doc(db, "users", `${currentUser?.uid}`);

      //Remove favorite movie
      const filteredMovies = movies.filter((movie) => movie.id !== id);

      //Update savedMovies
      await updateDoc(ref, {
        savedMovies: filteredMovies,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const slideToLeft = () => {
    rowSliderRef.current.scrollLeft -= 300;
  };

  const slideToRight = () => {
    rowSliderRef.current.scrollLeft += 300;
  };
  return (
    <>
      <div className="relative flex w-full h-[250px] pl-2 group mt-6">
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
              <div className="relative h-full min-w-[200px]" key={movie.id}>
                <div className="absolute bg-slate-950 opacity-0 hover:opacity-90 w-full h-full z-[12] cursor-pointer">
                  <div className="flex flex-col justify-evenly items-center w-full h-full">
                    <IoCloseSharp
                      className="fill-slate-100 absolute top-0 right-0"
                      size={25}
                      onClick={() => deleteFavorite(movie.id)}
                    />
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
