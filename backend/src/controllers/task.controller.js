import { Task } from "../models/task.model.js";
import { z } from "zod";

const taskSchema = z.object({
  text: z.string().min(1, "Task text cannot be empty").trim(),
});

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    req.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { text } = taskSchema.parse(req.body);
    const task = await Task.create({
      user: req.user._id,
      text,
    });
    req.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    task.isCompleted = !task.isCompleted;
    if (req.body.isCompleted !== undefined) {
      task.isCompleted = req.body.isCompleted;
    }
    const updatedTask = await task.save();
    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
      res.status(200).json({
        success: true,
        message: "Task deleted instantly",
      });
    }
  } catch (error) {
    next(error);
  }
};
