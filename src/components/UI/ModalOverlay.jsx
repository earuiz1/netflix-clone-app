import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/index";

const ModalOverlay = () => {
  const dispatch = useDispatch();
  const { title, backDropPath, language, releaseDate, overview } = useSelector(
    (state) => state.modalInfo
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
          {language === "en" && "English"}
        </span>
        <span className="text-sm font-light text-slate-100 italic">
          {releaseDate}
        </span>
      </div>
      <span className="text-slate-100 text-sm font-mediun">{overview}</span>
      <button className="bg-slate-100 font-medium p-2 text-slate-900 rounde-sm">
        Add To Favorites
      </button>
    </div>
  );
};

export default ModalOverlay;
