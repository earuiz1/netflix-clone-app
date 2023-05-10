import { useContext } from "react";
import ModalContext from "../../context/ModalContext";

const ModalOverlay = () => {
  const { movieInfo, setIsOpen } = useContext(ModalContext);

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="bg-slate-700 text-slate-100 absolute flex flex-col gap-4 min-w-[80%] rounded-md p-4 top-[20%] left-1/2 transform -translate-x-[50%] z-[103]">
      <h3>{movieInfo.title}</h3>
      <div className="w-full h-[400px]">
        <img
          src={`https://image.tmdb.org/t/p/original/${movieInfo.backDropPath}`}
          alt={movieInfo.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <button onClick={closeModal} className="bg-slate-100 p-2 text-slate-900">
        Close
      </button>
    </div>
  );
};

export default ModalOverlay;
