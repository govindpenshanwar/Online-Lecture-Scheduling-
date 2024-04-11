// import mongoose from 'mongoose';

// const InstructorSchema = new mongoose.Schema({
//     name: String,
//     course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
//     lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }]
// })

// const Instructor = mongoose.models.Instructor || mongoose.model('Instructor', InstructorSchema);

// export default Instructor;

// models/Instructor.js

import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
    name: String,
    lectures: [{
        date: Date,
        courseName: String
        // date: Date,
        // course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    }]
});

const Instructor = mongoose.models.Instructor || mongoose.model('Instructor', instructorSchema);

export default Instructor;
