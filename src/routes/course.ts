import express from "express";
import { auth } from "../middleware/auth";

const router = express.Router();

import {
  createCourse,
  getCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} from "../controller/courseController";

router.post("/create", auth, createCourse);
router.get("/read", getCourse);
router.get("/read/:id", getSingleCourse);
router.patch("/update/:id", auth, updateCourse);
router.delete("/delete/:id", auth, deleteCourse);

export default router;
