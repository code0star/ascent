import React from "react";
import "@/app/styles/loader.css";


const Loader = () => {
  return (
    <div className="relative w-[120px] h-[90px] mx-auto">
      <div className="absolute bottom-[30px] left-[50px] w-[30px] h-[30px] bg-[#2a9d8f] rounded-full animate-bounce-custom"></div>
      <div className="absolute right-0 top-0 w-[45px] h-[7px] rounded-[4px] shadow-[0_5px_0_#f2f2f2,-35px_50px_0_#f2f2f2,-70px_95px_0_#f2f2f2] animate-step-custom"></div>
    </div>
  );
};

export default Loader;
