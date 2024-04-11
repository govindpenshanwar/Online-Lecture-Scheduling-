import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../../helpers/baseUrl';


function AllLectures() {
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const api = await axios.get(`${baseUrl}/api/allLectures`);
            const res = api.data;
            setLectures(res.result);
            console.log("All lectures => ", res);
        }
        fetchData();
    }, [])
    return (
        <>
            <p className='text-xl font-semibold '>All Lectures</p>
            <div className=' flex flex-row gap-6'>
                {lectures.map((item) => (
                    <ul
                        className='border flex flex-col gap-2 justify-between w-max  bg-gray-100 p-4 rounded-md '
                        key={item._id}>
                        <li className='font-semibold text-base'>Date : {new Date(item.date).toDateString()}</li>
                        <li className='font-semibold text-base'>Instructor Name : {item.instructorName}</li>
                        <li className='font-semibold text-base'>Course Name : {item.courseName}</li>

                    </ul>
                ))}
            </div>
        </>
    )
}

export default AllLectures
