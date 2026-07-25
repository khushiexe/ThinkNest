import React from "react";
import { FaUserTie, FaClock, FaUserFriends } from "react-icons/fa";
import { BsClipboardFill } from "react-icons/bs";

const Features = () => {
  return (
    <section className="mx-auto max-w-[1140px] px-6 lg:px-12 relative -mt-16 z-10">
      <div className="flex flex-wrap gap-x-4 bg-light rounded-xl">

        {/* Feature 1 */}
        <div className="flex flex-col gap-y-2 p-4 rounded-xl max-w-[233px]">
          <FaUserTie className="text-xl mb-2" />
          <h5 className="h5">Qualified Instructors</h5>
          <p>
            Learn from experienced and certified tutors who provide personalized guidance
            to help you achieve your academic goals with confidence.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col gap-y-2 p-4 rounded-xl max-w-[233px] bg-secondary">
          <FaClock className="text-xl mb-2" />
          <h5 className="h5">24/7 Availability</h5>
          <p>
          Access learning support anytime, anywhere. Our platform connects you with
          tutors whenever you need help, day or night.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col gap-y-2 p-4 rounded-xl max-w-[233px]">
          <BsClipboardFill className="text-xl mb-2" />
          <h5 className="h5">Interactive Whiteboards</h5>
          <p>
          Collaborate in real time using interactive whiteboards that make explaining
          concepts, solving problems, and sharing ideas simple and engaging.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col gap-y-2 p-4 rounded-xl max-w-[233px]">
          <FaUserFriends className="text-xl mb-2" />
          <h5 className="h5">1-on-1 Live Sessions</h5>
          <p>
          Enjoy personalized one-on-one live tutoring sessions tailored to your
          learning style, pace, and academic objectives.

          </p>
        </div>

      </div>
    </section>
  );
};

export default Features;