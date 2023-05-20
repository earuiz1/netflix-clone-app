import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/index";
import { useEffect, useState, useMemo } from "react";

const ModalOverlay = () => {
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);
  const dispatch = useDispatch();
  const {
    id,
    title,
    backDropPath,
    language,
    releaseDate,
    overview,
    genresIDs,
  } = useSelector((state) => state.modalInfo);

  // Combine the two useEffect hooks: Since both hooks are responsible for fetching data, you can combine them into a single useEffect hook to reduce the number of network requests.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresResponse, castResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${
              import.meta.env.VITE_MOVIES_API_KEY
            }`
          ).then((response) => response.json()),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
              import.meta.env.VITE_MOVIES_API_KEY
            }`
          ).then((response) => response.json()),
        ]);

        setGenres(genresResponse.genres);
        setCast(castResponse.cast);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Use memoization for filterGenres: Since filterGenres depends on genres and genresIDs, you can memoize its value using the useMemo hook. This way, it will only be recalculated when its dependencies change.
  const filteredGenres = useMemo(
    () => genres?.filter((genre) => genresIDs.includes(genre.id)),
    [genres, genresIDs]
  );

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <div className="bg-slate-700 text-slate-100 absolute flex flex-col gap-4 min-w-[80%] md:min-w-[70%] lg:min-w-[60%] xl:min-w-[50%] rounded-md p-6 top-[20%] left-1/2 transform -translate-x-[50%] z-[103]">
      <div className="w-full relative">
        <h4 className="font-bold text-center">{title}</h4>
      </div>
      <IoCloseSharp
        onClick={closeModalHandler}
        size={30}
        className="fill-slate-900 bg-slate-100 absolute top-0 right-0 transform -translate-y-2 translate-x-2 rounded-full p-1 cursor-pointer z-[103]"
      />
      <div className="w-full h-[300px]">
        <img
          src={`https://image.tmdb.org/t/p/original/${backDropPath}`}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-slate-100">
          Language: {language === "en" && "English"}
        </span>
        <span className="text-sm font-light text-slate-100 italic">
          Release Date: {releaseDate}
        </span>
      </div>
      <span className="text-slate-100 text-sm font-mediun">
        Genres: {filteredGenres.map((genre) => genre.name).join(", ")}
      </span>
      <span className="text-slate-100 text-sm font-mediun line-clamp-2">
        Cast: {cast.map((c) => c.name).join(", ")}
      </span>
      <span className="text-slate-100 text-sm font-mediun">{overview}</span>
      <button className="bg-slate-100 font-medium p-2 text-slate-900 rounde-sm">
        Add To Favorites
      </button>
    </div>
  );
};

export default ModalOverlay;
