import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MySessions = () => {
  const { tutors, currency, token, backendUrl, getTutorsData } = useContext(AppContext);
  const [sessions, setSessions] = useState([])

  const getUserSessions = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/sessions", { headers: { atoken: token } })
      if (data.success) {
        setSessions(data.sessions.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const paymentRazorPay = async (sessionId) => {
    try {

      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { sessionId },
        { headers: { atoken: token } }
      );

      if (data.success) {

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "ThinkNest",
          description: "Session Booking",
          order_id: data.order.id,

          handler: async function (response) {

            try {

              const verifyData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                sessionId: sessionId
              };

              const { data } = await axios.post(
                backendUrl + "/api/user/verify-razorpay",
                verifyData,
                {
                  headers: { atoken: token }
                }
              );

              if (data.success) {
                toast.success(data.message);

                // Refresh data
                getUserSessions();
                getTutorsData();

              } else {
                toast.error(data.message);
              }

            } catch (error) {
              console.log(error);
              toast.error(error.message);
            }

          },

          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token)
      getUserSessions()
  }, [token])

  const cancelSession = async (sessionId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-session', { sessionId },
        { headers: { atoken: token } });
      if (data.success) {
        toast.success(data.message)
        getUserSessions()
        getTutorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {

    }
  };

  return (
    <section className="max-padd-container py-24">
      <h3 className="h3 mb-8">My Sessions</h3>

      <div className="space-y-5">
        {sessions?.map((session, i) => (
          <div
            key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5" >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Section */}
              <div className="flex gap-5 flex-1">
                {/* Tutor Image */}
                <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <img src={session.tutData.image} alt={session.tutData.name} className="w-full h-full object-cover" />
                </div>

                {/* Tutor Details */}
                <div className="flex-1">
                  <h5 className="h5 capitalize mb-1">{session.tutData.name}</h5>

                  <p className="text-gray-500 mb-1">
                    {session.tutData.qualification}
                  </p>

                  <div className="flex gap-2 text-sm mb-1">
                    <span className="font-semibold">Subject</span>
                    <span>{session.tutData.subject}</span>
                  </div>

                  <div className="flex gap-2 text-sm mb-1">
                    <span className="font-semibold">Address:</span>
                    <span>
                      {session.tutData.address?.city},{" "}
                      {session.tutData.address?.country}
                    </span>
                  </div>

                  <div className="flex gap-2 text-sm mb-1">
                    <span className="font-semibold">Fee</span>
                    <span>
                      {currency}
                      {session.tutData.fees}
                    </span>
                  </div>

                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">
                      Date & Time:
                    </span>
                    <span>{session.slotDate}| {session.slotTime}</span>
                  </div>
                </div>
              </div>

              {/* Status & Button */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => paymentRazorPay(session._id)}
                  disabled={session.payment}
                  className={`${session.isCompleted ? "block" : session.cancelled ? "hidden" : "block"}
                   disabled:cursor-not-allowed disabled:text-green-500 ${session.payment || session.isCompleted ?
                     "btn-ghost" : "btn-light"} max-md:!px-1 !py-1 !text-xs !rounded`}>
                  {session.isCompleted ? "Completed" : session.payment ? "Paid" : "Pay"}
                </button>
                <button
                  onClick={() => cancelSession(session._id)}
                  disabled={session.cancelled}
                  className={`${session.isCompleted || session.payment ? "hidden" : "block"} 
                  disabled:cursor-not-allowed disabled:text-red-500 ${session.cancelled ? "btn-ghost" : "btn-light"}
                   max-md:!px-1 !py-1 !text-xs !rounded`}>
                  {session.cancelled ? "cancelled" : "cancel"}
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