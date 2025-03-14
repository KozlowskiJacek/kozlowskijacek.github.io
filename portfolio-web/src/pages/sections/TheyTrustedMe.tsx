import React from "react";
import workInProgress from "../assets/img/test.jpg";
import ImageSlider from "../../components/ImageSlider";

const TheyTrustedMe = () => {
  return (
    <section
      className="text-white bg-bg_color_1 flex flex-col justify-center items-center min-h-screen w-full pt-[50px] px-4"
      id="feedback"
    >
      <div className="">
        <h2 className="leading-10 md:text-5xl text-3xl font-semibold mb-12 text-center">
          They Trusted <span className="text-main_accent">Me</span>
        </h2>
      </div>
      
      <ImageSlider />
    </section>
  );
};

export default TheyTrustedMe;
