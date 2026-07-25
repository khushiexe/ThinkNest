import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {FaStar } from "react-icons/fa" ;

const SimilarTutors = ({ tutId, subject }) => {

  const { tutors, navigate , currency} = useContext(AppContext);
  const [simTutors, setSimTutors] = useState([]);

  useEffect(() => {
    if (tutors.length > 0 && subject) {

      const tutData = tutors.filter(
        (tutor) =>
          tutor.subject === subject &&
          tutor._id !== tutId
      );

      setSimTutors(tutData);
      console.log(simTutors);
    }
  }, [tutors, subject, tutId]);

  return (
    <section className="pt-16 xl:pt-32">

      {/* Title */}
      <div className="max-w-xl mx-auto text-center pb-16">
        <div className="h3">
          <div className="inline-flex flexCenter gap-2 flex-wrap capitalize">
            Tutors with Similar Expertise
          </div>
        </div>

        <p>
          Our platform is designed to empower professional tutors who are
          passionate about sharing knowledge and shaping futures.
        </p>
      </div>

      {/* Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {simTutors.slice(0, 5).map((tutor, i) => (
          <div key={i} className="rounded-xl overflow-hidden relative group">
            <div
            key={i}
            className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
          >

            {/* Image */}
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full h-[360px] object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Normal Content */}
            <div className="absolute bottom-0 left-0 w-full p-5 text-white transition duration-300 group-hover:opacity-0">

              <div className="flex items-center gap-1 text-yellow-300 text-sm">
                <FaStar />
                <span>4.8</span>
              </div>

              <h3 className="text-xl font-bold mt-2">
                {tutor.name}
              </h3>

              <p className="text-white/80">
                {tutor.subject}
              </p>

              <p className="font-semibold mt-2">
                {currency}
                {tutor.price}/hr
              </p>

            </div>

            {/* Hover Buttons */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300">

              <button
                onClick={() => {
                  navigate(`/sessions/${tutor._id}`);
                  window.scrollTo(0, 0);
                }}
                className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition"
              >
                View Profile
              </button>

              <button
                onClick={() => {
                  navigate("/tutors");
                  window.scrollTo(0, 0);
                }}
                className="w-full mt-3 bg-slate-900 text-white font-semibold py-3 rounded-full hover:bg-black transition"
              >
                View All Tutors
              </button>

            </div>
          </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default SimilarTutors;