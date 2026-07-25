import React, { useState , useContext} from "react";
import profileImage from "../assets/user.jpg";
import upload_icon from "../assets/upload_icon.png";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const handleProfileUpdate = async () => {
    try {
        const formData = new FormData()

        formData.append("name", userData.name)
        formData.append("email", userData.email)
        formData.append("phone", userData.phone)
        formData.append("address", JSON.stringify(userData.address || {}))
        formData.append("gender", userData.gender)
        formData.append("dob", userData.dob)

        if (selectedImage) {
            formData.append("image", selectedImage)
        }

        const { data } = await axios.post( backendUrl + "/api/user/update-profile", formData, { headers: { atoken: token } })
        
        if (data.success) {
            toast.success(data.message)
            await loadUserProfileData()
            setIsEditing(false)
            setSelectedImage(null) // Fixed: changed false to null for resetting image state
        } else {
            toast.error(data.message)
        }
    } catch (error){
        console.log(error)
        toast.error(error.message)
    }
}

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "city" || name === "country") {
      setUserData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // IF NO USER DATA IS LOADED YET, SHOW THIS INSTEAD OF A BLANK SCREEN
  if (!userData) {
    return (
        <div className="max-padd-container py-24 flex justify-center items-center h-screen">
            <p className="text-xl text-gray-500 font-semibold">Loading Profile...</p>
        </div>
    );
  }

  return (
    <div className="max-padd-container py-24">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="relative">
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : userData.image || profileImage // Added fallback image just in case
                }
                alt=""
                className="h-32 w-32 rounded-md object-cover"
              />

              {isEditing && (
                <>
                  <label
                    htmlFor="image"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md cursor-pointer hover:bg-black/70 transition"
                  >
                    <span className="text-white text-xs font-semibold">
                      Upload
                    </span>
                  </label>

                  <input
                    type="file"
                    id="image"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedImage(e.target.files[0])
                    }
                  />
                </>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {userData.name}
              </h2>
              <p className="text-gray-500 mt-1">
                {userData.email}
              </p>
            </div>
          </div>

          <hr className="my-8" />

          {/* Personal Details */}
          <h4 className="text-xl font-semibold text-gray-600 mb-5">
            Personal Details
          </h4>

          <div className="space-y-5">
            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="font-semibold sm:w-44">Name</label>
              {isEditing ? (
                <input type="text" name="name" value={userData.name || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full sm:w-2/3"/>
              ) : (
                <p>{userData.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="font-semibold sm:w-44">Email</label>
              {isEditing ? (
                <input type="email" name="email" value={userData.email || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full sm:w-2/3"/>
              ) : (
                <p>{userData.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="font-semibold sm:w-44">Phone</label>
              {isEditing ? (
                <input type="text" name="phone" value={userData.phone || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full sm:w-2/3"/>
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="font-semibold sm:w-44">Date of Birth</label>
              {isEditing ? (
                <input type="date" name="dob" value={userData.dob || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full sm:w-2/3"/>
              ) : (
                <p>{userData.dob}</p>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="font-semibold sm:w-44">Gender</label>
              {isEditing ? (
                <select name="gender" value={userData.gender || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full sm:w-2/3">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}
            </div>          
          </div>

          {/* Location Details */}
          <hr className="my-8" />
          <h4 className="text-xl font-semibold text-gray-600 mb-5">
            Location Details
          </h4>

          <div className="space-y-5">
            {/* City */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="font-semibold sm:w-44">City</label>
              {isEditing ? (
                <input type="text" name="city" value={userData?.address?.city || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full sm:w-2/3"/>
              ) : (
                <p>{userData?.address?.city || 'Not specified'}</p>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="font-semibold sm:w-44">Country</label>
              {isEditing ? (
                <input type="text" name="country" value={userData?.address?.country || ''} onChange={handleChange} className="border rounded px-3 py-2 w-full sm:w-2/3"/>
              ) : (
                <p>{userData?.address?.country || 'Not specified'}</p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-10 flex justify-end">
            <button onClick={() => {if (isEditing) { handleProfileUpdate()} else {setIsEditing(true)}}} className="mt-6 btn-secondary min-w-64">
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

        </div>
    </div>
  );
};

export default MyProfile;  