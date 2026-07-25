import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const TutorsList = () => {
  const { tutors, aToken, getAllTutors } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getAllTutors();
    }
  }, [aToken]);

  return (
    <div className="px-4 sm:px-8 py-8 h-screen lg:pl-[23%] overflow-y-auto">
      <div className="flex flex-wrap gap-10">
        {tutors?.map((tutor, i) => (
          <div key={i} className="relative w-72 h-62 rounded-xl overflow-hidden cursor-pointer group shadow-sm">
            {/* Tutor Image */}
            <img src={tutor.image} alt={tutor.name}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

            {/* Tutor Info */}
            <div className="absolute bottom-0 left-0 w-full p-3 text-white">
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    tutor.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>

                <span className="text-white/90">
                  {tutor.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <h3 className="font-bold text-xl mt-1">
                {tutor.name}
              </h3>

              <p className="text-white/80">
                {tutor.subject}
              </p>
            </div>

            {/* Hover Button */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <button
                onClick={() => {
                  navigate(`/sessions/${tutor._id}`);
                  window.scrollTo(0, 0);
                }}
                className="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-gray-200"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorsList;