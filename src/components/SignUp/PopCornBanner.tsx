import React from "react";
import Popcorn from "../../assets/Popcorn.svg";

const PopCornBanner = () => {
  return (
    <section className="w-full h-[250px] mt-2">
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-red-800 to-blue-800 gap-2">
        <img src={Popcorn} alt="" />
        <span className="text-slate-100 font-semibold tracking-widest text-base">
          The Netflix you love for just $6.99
        </span>
        <span className="text-slate-100 text-sm">
          Get the Standard with ads plan.
        </span>
      </div>
    </section>
  );
};

export default PopCornBanner;
