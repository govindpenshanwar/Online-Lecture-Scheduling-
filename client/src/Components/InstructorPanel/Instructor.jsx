import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import axios from 'axios';
import { baseUrl } from '../../helpers/baseUrl';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Instructor() {
    const { instructorName } = useContext(UserContext);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            // const api = await axios.get(`${baseUrl}/api/getLecture/${username}`);
            const api = await axios.get(`${baseUrl}/api/getLecture/${instructorName}`);
            const res = api.data;
            setData(res.lecture);
            console.log("Inst data => ", res);
        }
        fetchData();
    }, [instructorName])

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
        <>
            <div className='flex flex-col  items-center justify-center gap-5'>
                <p className='text-center mt-10 font-bold text-2xl'> Instructor Panel {instructorName}</p>

                <Button
                    size='large'
                    className='flex items-center justify-center'
                    variant="contained" color="primary"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
            <div className='flex flex-row gap-6 items-center justify-center mt-20   '>
                {data.length > 0 ?
                    data && data.map((lecture) => (
                        <ul
                            className='flex flex-col border bg-gray-200 p-4 rounded-md  '
                            key={lecture._id}>
                            <li className='text-base font-semibold'>Course : {lecture.courseName}</li>
                            <li className='text-base font-semibold'>Date : {new Date(lecture.date).toDateString()}</li>
                        </ul>
                    )) :

                    <div className='text-2xl font-bold text-center'>No Lectures Found...</div>
                }

            </div>
        </>
    )
}

export default Instructor
