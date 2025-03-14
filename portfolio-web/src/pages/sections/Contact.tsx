import React, { useState } from "react";
import FormContact from "../../components/FormContact";

const Contact = () => {
  return (
    <section
      className="text-white bg-bg_color_2 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]"
      id="contact"
    >
      <h2 className="mb-5 md:text-5xl text-3xl font-semibold">
        Let's <span className="text-main_accent">Collaborate</span> 🤝
      </h2>
      <p className="md:text-base text-sm text-gray_400 mb-[3rem]">
        Write me an message and I will response within 1️⃣ business day
      </p>

      <FormContact />
    </section>
  );
};

export default Contact;
