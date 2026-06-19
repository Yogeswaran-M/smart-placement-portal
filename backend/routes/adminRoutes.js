import express from 'express';
import { registerAdmin, loginAdmin, getAdminDashboard } from '../controllers/adminController.js';
import adminAuth from '../middlewares/adminAuth.js';

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/dashboard", adminAuth, getAdminDashboard);

export default router;