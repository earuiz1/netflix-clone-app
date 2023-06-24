import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/index";
import { useEffect, useState, useMemo } from "react";

const ModalOverlay = () => {
  const [cast, setCast] = useState([]);
  const [movie, setMovie] = useState({});
  const { id, genre_ids, title, release_date, backdrop_path, overview } =
    useSelector((state) => state.modalInfo);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  // Combine the two useEffect hooks: Since both hooks are responsible for fetching data, you can combine them into a single useEffect hook to reduce the number of network requests.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [castResponse, movieResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
              import.meta.env.VITE_MOVIES_API_KEY
            }`
          ).then((response) => response.json()),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${
              import.meta.env.VITE_MOVIES_API_KEY
            }`
          ).then((response) => response.json()),
        ]);

        setCast(castResponse.cast);
        setMovie(movieResponse);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(movie);

  useEffect(() => {
    const scrollToModal = () => {
      const windowHeight = window.innerHeight;
      const modalDistance = windowHeight * 0.2;
      window.scrollTo({
        top: modalDistance,
        behavior: "smooth",
      });
    };

    scrollToModal();
  }, []);

  // Use memoization for filterGenres: Since filterGenres depends on genres and genresIDs, you can memoize its value using the useMemo hook. This way, it will only be recalculated when its dependencies change.
  const filteredGenres = useMemo(
    () => genres?.filter((genre) => genre_ids.includes(genre.id)),
    [genres, genre_ids]
  );

  //Close Modal
  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <div className="bg-[#151415] text-slate-100 absolute flex flex-col lg:flex-row w-[90%] lg:w-[80%] lg:h-[500px] rounded-md p-8 top-[20%] left-1/2 transform -translate-x-[50%] z-[103] gap-8 shadow-lg shadow-slate-600">
      <IoCloseSharp
        onClick={closeModalHandler}
        size={30}
        className="fill-slate-900 bg-slate-100 absolute top-0 right-0 transform -translate-y-2 translate-x-2 rounded-full p-1 cursor-pointer z-[103]"
      />
      <div className="min-w-[40%] h-full rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="font-bold text-2xl lg:text-4xl">{title}</h4>
          <p className="text-xs lg:text-sm text-slate-100">
            {`${release_date} | ${filteredGenres
              .map((genre) => genre?.name)
              .join(", ")} | ${movie?.runtime} minutes | ${movie?.status}`}
          </p>
        </div>
        <div>
          <p className="font-medium text-sm lg:text-base">Description:</p>
          <p className="text-xs lg:text-sm text-slate-100">{overview}</p>
        </div>
        <div>
          <p className="font-medium text-sm lg:text-base">Cast:</p>
          <p className="text-slate-100 text-xs lg:text-sm line-clamp-2">
            {cast.map((c) => c.name).join(", ")}
          </p>
        </div>
        <div>
          <p className="font-medium text-sm lg:text-base">Rating:</p>
          <p className="text-xs lg:text-sm text-slate-100">
            {movie.vote_average
              ? `${movie?.vote_average.toFixed(2)} / 10`
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalOverlay;
