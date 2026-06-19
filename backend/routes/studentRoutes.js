import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { loginStudent, registerStudent, getStudentProfile, updateStudentProfile, uploadResumeController } from "../controllers/studentController.js";
import uploadResume from "../middlewares/uploadResume.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/profile", protect, getStudentProfile);
router.put("/profile", protect, updateStudentProfile);
router.put("/uploads/resumes", protect, uploadResume.single("resume"), uploadResumeController);

export default router;