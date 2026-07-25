import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MySessions = () => {
  const { tutors, currency } = useContext(AppContext);

  return (
    <section className="max-padd-container py-24">
      <h3 className="h3 mb-8">My Sessions</h3>

      <div className="space-y-5">
        {tutors?.map((tutor, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Section */}
              <div className="flex gap-5 flex-1">
                {/* Tutor Image */}
                <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Tutor Details */}
                <div className="flex-1">
                  <h5 className="h5 capitalize mb-1">{tutor.name}</h5>

                  <p className="text-gray-500 mb-1">
                    {tutor.qualification}
                  </p>

                  <div className="flex gap-2 text-sm mb-1">
                    <span className="font-semibold">Subject</span>
                    <span>{tutor.subject}</span>
                  </div>

                  <div className="flex gap-2 text-sm mb-1">
                    <span className="font-semibold">Address:</span>
                    <span>
                      {tutor.location?.city},{" "}
                      {tutor.location?.country}
                    </span>
                  </div>

                  <div className="flex gap-2 text-sm mb-1">
                    <span className="font-semibold">Fee</span>
                    <span>
                      {currency}
                      {tutor.fees}
                    </span>
                  </div>

                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">
                      Date & Time:
                    </span>
                    <span>18/5/2025 | 10:30 AM</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex lg:justify-end">
                <button className="btn-ghost whitespace-nowrap">
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MySessions;