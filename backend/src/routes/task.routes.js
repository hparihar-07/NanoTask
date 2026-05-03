import express from "express";
import {
  getTasks,
  createTasks,
  toggleTasks,
  deleteTask,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getTasks).post(createTasks);

router.route("/:id").patch(toggleTasks).delete(deleteTask);

export default router;
