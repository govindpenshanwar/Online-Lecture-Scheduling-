import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../helpers/baseUrl';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Navbar() {

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.get(`${baseUrl}/api/logout`, {
                withCredentials: true
            });
            toast.success("Logout Successfull !!")
            navigate('/');
        } catch (error) {
            console.error("Err logging out => ", error.message);
        }
    };
    return (
        <nav className='flex mt-5 flex-row  justify-center items-center '>
            <ul className='flex flex-row gap-5 justify-center items-center text-xl font-semibold '>
                <Link to={'/addCourse'}> <li className='hover:text-red-600' >Add Course</li></Link>
                <Link to={'/addInstructor'}><li className='hover:text-red-600' >Add Lecture</li></Link>
                <button className='hover:text-red-600' onClick={handleLogout}>Logout</button>
            </ul>
        </nav>
    )
}

export default Navbar
