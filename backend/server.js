import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import tutorRouter from "./routes/tutorRoute.js";
import userRouter from "./routes/userRoute.js";

// Initialize Express application
const app = express();
const port = process.env.PORT || 4000;

connectDB() ; //Establish Connection to the database;
connectCloudinary() ; //Setup Cloudinary for Image Storage;

// Middleware Setup
app.use(express.json()); // Enables JSON request body parsing
app.use(cors()); // Allows Cross-Origin Resource Sharing (CORS)

// Root endpoint to check API status
app.get("/", (req, res) => {
  res.send("API successfully connected!");
});

//Define API Routes
app.use('/api/admin',adminRouter) ;
app.use('/api/tutor',tutorRouter) ;
app.use('/api/user',userRouter) ;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});