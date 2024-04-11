import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: String,
    level: String,
    description: String,
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }]
});

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

export default Course;

