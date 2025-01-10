import projectModel from "../models/project.model.js";
import userModel from "../models/user.model.js";
import * as projectService from "../services/project.service.js";
import { validationResult } from "express-validator";

export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // console.log(req.user);
    const { name } = req.body;
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    // console.log(loggedInUser);
    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = loggedInUser._id;

    const newProject = await projectService.createProject({ name, userId });

    res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getAllProject = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({ email: req.user.email });

    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const allUserProjects = await projectService.getAllProjectByUserId({
      userId: loggedInUser._id,
    });
    res.status(200).json({ projects: allUserProjects });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
