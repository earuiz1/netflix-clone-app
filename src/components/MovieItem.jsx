import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

const MovieItem = ({ id, title, backDropPath }) => {
  return (
    <div id={id} className="relative h-full min-w-[200px] ">
      <div className="absolute bg-slate-950 opacity-0 hover:opacity-90 w-full h-full z-[12] cursor-pointer">
        <div className="flex flex-col justify-evenly items-center w-full h-full">
          <BsFillPlayFill className="fill-slate-100" size={50} />
          <h4 className="text-center text-sm font-medium text-slate-100 w-[80%]">
            {title}
          </h4>
        </div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original/${backDropPath}`}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default MovieItem;

// <div className="bg-slate-900 opacity-40 hover:opacity-70 absolute w-full h-full z-[12]"></div>
// <h4 className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-slate-100 text-sm text-center uppercase font-medium z-[13] line-clamp-2 w-[80%]">
//   {title}
// </h4>