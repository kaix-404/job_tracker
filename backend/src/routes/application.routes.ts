import express from "express";
import {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
  updateStatus
} from "../controllers/application.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.use(protect);

router.post("/", protect, createApplication);
router.get("/", protect, getApplications);
router.put("/:id", protect, updateApplication);
router.delete("/:id", protect, deleteApplication);
router.patch("/:id/status", protect, updateStatus);

export default router;