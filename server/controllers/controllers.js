import mongoose from "mongoose";
import User from "../models/signupModel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Course from "../models/Courses.js";
import Instructor from "../models/Instructor.js";
import Lecture from "../models/Lecture.js";
import { connect } from "../configs/DbConfig.js";

dotenv.config();

export async function getAll(req, res) {
    try {
        await res.json({
            message: "Hello World",
            success: true
        })

    } catch (error) {
        console.error("Err : ", error.message);
    }
}

export async function handleSignUp(req, res) {
    try {
        const { username, email, password, role } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.json({
                message: "User Already Exists",
                success: false
            })
        };

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        return res.json({
            message: "User Registred Successfully ",
            success: true,
            newUser
        })


    } catch (error) {
        console.error("Err signing user => ", error.message);
    }
}

export async function handleLogin(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({
                message: "User Does not exists",
                success: false
            })
        };

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return res.json({
                message: "Invalid Password",
                success: false
            })
        };
        const tokenData = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        const jwtSecret = process.env.JWT_SECRET;

        const token = await jwt.sign(tokenData, jwtSecret, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: false
        });
        return res.json({
            message: "Login successfull",
            Success: true,
            token: token,
            role: user.role
        });
    } catch (error) {
        console.error("err login user => ", error.message);
    }
};

export async function addCourse(req, res) {
    const { name, level, description } = req.body;

    try {
        const newCourse = new Course({
            name,
            level,
            description
        });

        await newCourse.save();
        return res.json({
            message: "Course added successfully",
            success: true,
            newCourse
        });

    } catch (error) {
        console.error("Err adding course => ", error.message);
    }
}

export async function getAllInstructors(req, res) {
    try {
        const instructors = await Instructor.find();
        return res.json({
            success: true,
            instructors
        })
    } catch (error) {
        console.error("Err getting instructor");
    }
}

export async function addIntructor(req, res) {
    const { name } = req.body;
    try {

        // const course = await Course.findOne({ courseName });
        // if (!course) {
        //     return res.json({
        //         message: "Course Not Found",
        //         success: false
        //     });
        // };

        const instructor = new Instructor({
            name,
        });

        await instructor.save();

        return res.json({
            message: "Instructor added",
            success: true,
            instructor
        })

    } catch (error) {
        console.error("Err adding Instructor :", error.message);
    }
}

export async function addLecture(req, res) {
    try {
        const { instructorName, courseName, date } = req.body;

        const instructor = await Instructor.findOne({ name: instructorName });
        if (!instructor) {
            return res.json({
                message: "Instructor not found",
                success: false
            });
        };
        const course = await Course.findOne({ name: courseName });
        if (!course) {
            return res.json({
                message: "Course not found",
                success: false
            });
        }
        const existingLecture = instructor.lectures.find(lecture => lecture.date.getTime() === new Date(date).getTime());
        if (existingLecture) {
            return res.json({
                message: 'Instructor is already assigned a lecture on this date',
                success: false
            });
        };

        const newLecture = new Lecture({
            instructorName,
            courseName,
            date
        });
        await newLecture.save();

        // const newInstructor = instructor.lectures.push({
        //     date,
        //     courseName
        // });
        const newInstructor = instructor.lectures.push(newLecture);
        await instructor.save();

        course.lectures.push(newLecture._id);
        await course.save();

        return res.status(200).json({
            message: "Lecture added successfully",
            success: true,
            newLecture,
            instructor: newInstructor
        })
    } catch (error) {
        console.error("Err adding lecture => ", error.message);
    }
}

export async function getLecture(req, res) {
    const { instructorName } = req.params;
    try {
        const lecture = await Lecture.find({ instructorName });
        return res.json({
            success: true,
            lecture
        })

    } catch (error) {
        console.error("Err getting lecture => ", error.message);
    }

}

export async function getAllLectures(req, res) {
    try {
        const result = await Lecture.find();
        return res.json({
            success: true,
            result
        })
    } catch (error) {
        console.error("err getting all lectures", error.message);
    }
}

export async function deleteCourse(req, res) {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return res.json({
                message: "Course not found",
                success: false
            });
        }

        await Lecture.deleteMany({ courseName: course.name });

        await Instructor.updateMany({}, { $pull: { lectures: { courseName: course.name } } });

        await Course.findByIdAndDelete(id);

        return res.json({
            message: "Course deleted successfully",
            success: true
        });
    } catch (error) {
        console.error("Error deleting course:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export async function getAllCourse(req, res) {
    try {
        const result = await Course.find();
        return res.json({
            success: true,
            result
        })

    } catch (error) {
        console.error("err getting course", error.message);
    }
}

export async function logout(req, res) {
    try {
        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true
        });
        res.json({
            success: true,
            message: "Logout Successfull"
        })

    } catch (error) {
        console.error("Err logging out => ", error.message);
    }
}

connect();