import { Response } from "express";
import Application from "../models/Application";
import { AuthRequest } from "../middleware/auth.middleware";

// CREATE
export const createApplication = async (req: AuthRequest, res: Response) => {
  try {
    const app = await Application.create({
      ...req.body,
      userId: req.userId
    });

    res.json(app);
  } catch {
    res.status(500).json({ message: "Error creating application" });
  }
};

// GET ALL (user-specific)
export const getApplications = async (req: AuthRequest, res: Response) => {
  try {
    const apps = await Application.find({ userId: req.userId });
    res.json(apps);
  } catch {
    res.status(500).json({ message: "Error fetching applications" });
  }
};

// UPDATE
export const updateApplication = async (req: AuthRequest, res: Response) => {
  try {
    const app = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    res.json(app);
  } catch {
    res.status(500).json({ message: "Error updating" });
  }
};

export const updateStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;

    const app = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status },
      { new: true }
    );

    res.json(app);
  } catch {
    res.status(500).json({ message: "Error updating status" });
  }
};

// DELETE
export const deleteApplication = async (req: AuthRequest, res: Response) => {
  try {
    await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting" });
  }
};