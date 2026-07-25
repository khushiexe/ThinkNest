import express from "express";
import { addTutor, loginAdmin} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { allTutors } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/add-tutor", authAdmin , upload.single("image"), addTutor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-tutors", authAdmin , allTutors);
// adminRouter.post("/change-availability", authAdmin , changeAvailability);

export default adminRouter;