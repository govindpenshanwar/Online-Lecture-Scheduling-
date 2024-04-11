import React from 'react'
import AllInstructors from '../AllInstructors/AllInstructors'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import AllLectures from '../AllLecturesPage/AllLectures';
import Courses from '../AllCourses/Courses';
import Navbar from '../Nav/Navbar';


function Admin() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-center mt-10 gap-6 '>
                <p className='text-center text-2xl font-bold'> Admin panel</p >

                <AllInstructors />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        navigate('/addCourse')
                    }}
                >
                    Add Course
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        navigate('/addInstructor')
                    }}
                >
                    Add Lecture
                </Button>
                <Courses />
                <AllLectures />
            </div >
        </>
    )
}

export default Admin