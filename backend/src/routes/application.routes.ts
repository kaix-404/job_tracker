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

router.post("/", createApplication);
router.get("/", getApplications);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);
router.patch("/:id/status", updateStatus);

export default router;