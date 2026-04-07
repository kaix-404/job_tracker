import { Request, Response } from "express";
import {
  parseJobDescription,
  generateResumePoints
} from "../services/ai.service";

export const parseJD = async (req: Request, res: Response) => {
  try {
    const { jd } = req.body;

    if (!jd) return res.status(400).json({ message: "JD required" });

    const parsed = await parseJobDescription(jd);

    res.json(parsed);
  } catch {
    res.status(500).json({ message: "AI parsing failed" });
  }
};

export const getResumeSuggestions = async (req: Request, res: Response) => {
  try {
    const suggestions = await generateResumePoints(req.body);

    res.json({ suggestions });
  } catch {
    res.status(500).json({ message: "AI generation failed" });
  }
};