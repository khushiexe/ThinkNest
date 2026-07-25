import React, { useContext, useEffect, useState } from "react";
import tutor1 from "../assets/tutor1.png";
import tutor2 from "../assets/tutor2.png";
import tutor3 from "../assets/tutor3.png";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { subjectsData } from "../assets/data";
import { FaStar } from "react-icons/fa";
import { tutors } from "../assets/data";

function Tutors() {

  const {subject : subjectParam} = useParams() ; //capture subjects ;
  const { navigate, tutors , currency} = useContext(AppContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTutors, setFilteredTutors] = useState(tutors);

  //Handle Subject Click ;
  const handleSubjectClick = (subjectName) =>{
    navigate(`/tutors/${subjectName}`) ;
    }

  //Filter tutor on based of subject
  useEffect(()=>{
    if(subjectParam){
      setFilteredTutors(tutors.filter((tutor)=>tutor.subject === subjectParam)) ;
    }else{
      setFilteredTutors(tutors) ; // show all tutors ;
    }
  } , [subjectParam , tutors]) ;
  return (
    <div className="max-padd-container py-28">

      {/* Title */}
      <div className="max-w-5xl mx-auto text-center">

        <div className="inline-flex flex-wrap justify-center items-center gap-4">

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Get Started With Skilled Professionals
          </h2>

          <div className="flex -space-x-3">

            <img
              src={tutor1}
              alt="Tutor 1"
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />

            <img
              src={tutor2}
              alt="Tutor 2"
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />

            <img
              src={tutor3}
              alt="Tutor 3"
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />

          </div>

        </div>

        <p className="mt-6 text-gray-500 max-w-2xl mx-auto">
          Our platform is designed to empower professional tutors who are
          passionate about sharing knowledge and shaping futures.
        </p>

      </div>
      {/* { Tabs} */}
      <button onClick={() => setShowFilters((prev) => !prev)} 
      className="btn-secondary !py-1.5 mb-5 !rounded sm:hidden transition-all" >
          Filters
      </button>

<div
  className={` mt-10 mb-12 flex-col sm:flex-row max-sm:gap-y-2 rounded overflow-hidden max-w-5xl mx-auto ${
    showFilters ? "flexCenter" : "hidden sm:flexCenter"
  }`}
>
  {subjectsData.map((subject, i) => (
    <button onClick={ () => {handleSubjectClick(subject.name)}}
      key={i}
      className={`p-4 medium-15 cursor-pointer h-10 w-full bg-deep text-white flexStart sm:flexCenter border-2 border-transparent ${
        subject.name === subjectParam
          ? "border-b-2 border-b-secondary !text-secondary"
          : ""
      }`}
    >
      {subject.name}
    </button>
  ))}
</div>
   {/* Container / Tutor Cards */}
{/* Container / Tutor Cards */}
<div
  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-x-10 sm:gap-y-12"
>
  {filteredTutors?.map((tutor, i) => (
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

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {/* Normal Content */}
      <div className="absolute bottom-0 left-0 w-full p-5 text-white transition-all duration-300 group-hover:opacity-0">

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

      {/* Hover Overlay */}
      <div className="absolute inset-0 flex items-end justify-center p-5 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">

        <button
          onClick={() => {
            navigate(`/sessions/${tutor._id}`);
            window.scrollTo(0, 0);
          }}
          className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition"
        >
          View Profile
        </button>

      </div>

    </div>
  ))}
</div>
  </div>
  );
}

export default Tutors;