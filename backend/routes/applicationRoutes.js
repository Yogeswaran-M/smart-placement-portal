import express from "express";
import { applyCompany, deleteApplication, getAllApplications, getMyApplications, updateApplicationStatus } from "../controllers/applicationController.js";
import protect from "../middlewares/authMiddleware.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();
router.post("/apply", protect, applyCompany);
router.get("/my-applications",protect, getMyApplications);
router.get("/all", adminAuth, getAllApplications);
router.delete("/:id", protect, deleteApplication);
router.put("/status/:id", adminAuth, updateApplicationStatus);

export default router;