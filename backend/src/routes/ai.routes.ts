import express from "express";
import {
  parseJD,
  getResumeSuggestions
} from "../controllers/ai.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.use(protect);

router.post("/parse", parseJD);
router.post("/resume", getResumeSuggestions);

export default router;