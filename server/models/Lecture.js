import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
    date: Date,
    instructorName: String,
    courseName: String
    // instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    // course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

const Lecture = mongoose.models.Lecture || mongoose.model('Lecture', lectureSchema);
export default Lecture;