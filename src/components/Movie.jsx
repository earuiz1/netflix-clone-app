import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/index";
import { MdFavoriteBorder } from "react-icons/md";

const Movie = ({
  id,
  title,
  backDropPath,
  overview,
  language,
  releaseDate,
  genresIDs,
}) => {
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(
      modalActions.openModal({
        id,
        title,
        backDropPath,
        overview,
        language,
        releaseDate,
        genresIDs,
      })
    );
  };
  return (
    <div className="relative h-full min-w-[200px]">
      <div className="absolute bg-slate-950 opacity-0 hover:opacity-90 w-full h-full z-[12]">
        <div className="flex flex-col justify-around items-center w-full h-full">
          <MdFavoriteBorder
            size={25}
            className="fill-slate-100 self-start ml-4 cursor-pointer"
          />
          <BsFillPlayFill
            className="fill-slate-100 cursor-pointer"
            size={50}
            onClick={openModalHandler}
          />
          <h4 className="text-center text-sm font-medium text-slate-100 w-[80%]">
            {title}
          </h4>
        </div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${backDropPath}`}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Movie;
