import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <ReactLoading type="spin" color="#e50914" height={50} width={50} />
    </div>
  );
};

export default Loading;
