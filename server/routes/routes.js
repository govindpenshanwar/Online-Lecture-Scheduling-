import express from "express";
import {
    addCourse,
    addIntructor,
    addLecture,
    deleteCourse,
    getAll,
    getAllCourse,
    getAllInstructors,
    getAllLectures,
    getLecture,
    handleLogin,
    handleSignUp,
    logout,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", getAll);

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/addCourse", addCourse);
router.get("/getAllInstructors", getAllInstructors);
router.post("/addInstructor", addIntructor);
router.post("/addLecture", addLecture);
router.get("/getLecture/:instructorName", getLecture);
router.get("/allLectures", getAllLectures);
router.get("/getCourses", getAllCourse);
router.delete("/deleteCourse/:id", deleteCourse);
router.get("/logout", logout);
export default router;
