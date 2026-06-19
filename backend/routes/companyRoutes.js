import express from "express";
import { addCompany, deleteCompany, getAllCompanies, getSingleCompany, updateCompany } from "../controllers/companyController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/add", adminAuth, addCompany);
router.get("/all", getAllCompanies);
router.get("/:id", getSingleCompany);
router.delete("/:id", adminAuth, deleteCompany);
router.put("/:id", adminAuth, updateCompany);

export default router;