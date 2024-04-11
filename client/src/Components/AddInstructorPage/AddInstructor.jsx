import React from 'react'
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useNavigate, } from "react-router-dom";
import toast from "react-hot-toast";
import { baseUrl } from '../../helpers/baseUrl';
import { useForm } from 'react-hook-form';

function AddInstructor() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const handleClick = async (data) => {
        console.log("Lecture to be added => ", data);
        if (data !== "") {
            try {
                const api = await axios.post(`${baseUrl}/api/addLecture`, data, {
                    withCredentials: true
                });
                const res = api.data;
                const resStatus = api.status;
                console.log(resStatus);
                console.log("Lecture Data => ", res);
                if (res.success === true) {
                    toast.success("Lecture Created !!")
                    navigate('/admin');
                } else {
                    toast.error(res.message)
                }

            } catch (error) {
                console.error("Err signing user => ", error.message);

            }

        }
        else {
            toast.error("Please Enter Credentials")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleClick)} style={{ borderRightColor: "#FAF5FF" }}>
                <div className="flex items-center justify-center mt-24 mb-10 ">
                    <div
                        // className='flex flex-col gap-6 ml-48 w-96 mt-10'
                        className="flex flex-col gap-6 items-center  mt-10"
                    >
                        <span className="text-center text-xl font-mono font-bold">
                            Add Lecture
                        </span>

                        <TextField
                            variant="outlined"
                            label="Instructor Name*"
                            color="primary"
                            className="sm:w-96 w-80"
                            name="name"
                            {...register("instructorName", {
                                required: true
                            })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonSharpIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Course Name*"
                            color="primary"
                            className="sm:w-96 w-80"
                            name="username"
                            {...register("courseName", {
                                required: true
                            })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonSharpIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Date*"
                            color="primary"
                            className="sm:w-96 w-80"
                            name="role"
                            {...register("date", {
                                required: true
                            })}
                            type='date'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonSharpIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                            className="sm:w-60 w-48"
                        >
                            Add Course
                        </Button>


                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddInstructor;
