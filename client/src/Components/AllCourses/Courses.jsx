import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../../helpers/baseUrl';
function Courses() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/getCourses`);
                const response = res.data;
                setData(response.result);
                console.log("Courses => ", response);
            } catch (error) {
                console.error("Err fetching courses =. ", error.message);
            }
        }
        fetchData();
    }, [])
    return (
        <>
            <p className='text-xl font-semibold '> All Courses</p>

            <div>
                {
                    data.map((item) => (
                        <ul key={item._id} className='bg-gray-100 p-4 rounded-md mb-4'>
                            <li className='font-semibold text-base'>Course Name : {item.name}</li>
                        </ul>
                    ))
                }
            </div>
        </>
    )
}

export default Courses
