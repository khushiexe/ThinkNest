import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js" ;
import {v2 as cloudinary} from "cloudinary" ;
import tutorModel from "../models/tutorModel.js";
import sessionModel from "../models/sessionModel.js";

// API TO REGISTER USER
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Credentials" })
        }

        // Checking if Email is Valid
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Email is not valid" })
        }

        // Checking the password Strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong Password" })
        }

        // Hashing the Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            name,
            email,
            password: hashedPassword
        }
        
        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        
        res.json({
            success: true,
            token
        })        
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}


// API FOR USER LOGIN
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        // Checking if user exists
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET
            )

            res.json({
                success: true,
                token
            })
        } else {
            res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API FOR GET USER PROFILE
const getProfile = async (req, res)=>{
    try{
        const userId = req.userId
        const userData = await userModel.findById(userId).select("-password")
        res.json({
            success: true,
            userData
        })
    } catch(error){
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Ensure you have this imported at the top of your controller file:
// import { v2 as cloudinary } from "cloudinary";

const updateProfile = async (req, res) => {
    try {
        // --- ADD THESE 3 LINES ---
        console.log("1. User ID from req:", req.userId);
        console.log("2. Body data:", req.body);
        console.log("3. File data:", req.file);
        // -------------------------
        // Fix #1: Check if your middleware uses req.body.userId or req.userId
        // If it uses req.body, change this to: const { userId, name, phone, address, dob, gender } = req.body;
        const userId = req.userId; 
        const { name, phone, address, dob, gender } = req.body;
        
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({
                success: false,
                message: "Data Missing"
            });
        }

        // 1. Update the text fields first
        await userModel.findByIdAndUpdate(userId, { 
            name, 
            phone, 
            address: JSON.parse(address), 
            dob, 
            gender 
        });
        
        // 2. Upload the image to Cloudinary if it exists
        if (imageFile) {
            // Fix #2: Use lowercase 'cloudinary' matching your import
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imageUpload.secure_url;
            
            // 3. Update the database with the secure Cloudinary URL
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }
        
        res.json({
            success: true,
            message: "Profile Updated"
        });

    } catch(error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

// API FOR BOOK SESSION
const bookSession = async (req, res) => {
    try {

        const userId = req.userId
        const { tutId, slotDate, slotTime } = req.body

        const tutData = await tutorModel.findById(tutId).select("-password")

        if (!tutData.available) {
            return res.json({ success: false, message: "Tutor not available" })
        }

        let slots_booked = tutData.slots_booked ;
        // Checking for slot availability
if (slots_booked[slotDate]) {
    if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
            success: false,
            message: "Slot not available"
        })
    } else {
        slots_booked[slotDate].push(slotTime)
    }
} else {
    slots_booked[slotDate] = []
    slots_booked[slotDate].push(slotTime)
}

const userData = await userModel.findById(userId).select('-password')

const sessionData = {
    userId,
    tutId,
    userData,
    tutData,
    slotDate,
    slotTime,
    amount: tutData.fees,
    date: Date.now()
}

const newSession = new sessionModel(sessionData)
await newSession.save()

// save new slots data in tutData
await tutorModel.findByIdAndUpdate(tutId, { slots_booked })

res.json({
    success: true,
    message: "Session Booked"
})
    }catch (error){
        console.log(error) ;
        res.json({
                success:false,
                message:error.message
            })
    }
}

export {registerUser,loginUser,getProfile,updateProfile,bookSession} ;