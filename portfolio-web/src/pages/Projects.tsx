import React from "react";
import workInProgress from "../assets/img/test.jpg";

const Projects = () => {
  return (
    <section
      className="text-white bg-bg_color_2 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]"
      id="projects"
    >
      <h2 className="text-center text-5xl font-bold mb-10">
        My <span className="text-main_accent">Project</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10">
        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={workInProgress}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">Web Design</h4>
            <p className="mx-0 mb-2 mt-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, eaque.
            </p>
            <a href="#" className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full">
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={workInProgress}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">Web Design</h4>
            <p className="mx-0 mb-2 mt-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, eaque.
            </p>
            <a href="#" className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full">
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={workInProgress}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">Web Design</h4>
            <p className="mx-0 mb-2 mt-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, eaque.
            </p>
            <a href="#" className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full">
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={workInProgress}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">Web Design</h4>
            <p className="mx-0 mb-2 mt-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, eaque.
            </p>
            <a href="#" className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full">
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={workInProgress}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">Web Design</h4>
            <p className="mx-0 mb-2 mt-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, eaque.
            </p>
            <a href="#" className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full">
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={workInProgress}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">Web Design</h4>
            <p className="mx-0 mb-2 mt-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, eaque.
            </p>
            <a href="#" className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full">
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
