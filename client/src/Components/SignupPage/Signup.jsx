import React, { useContext } from 'react'
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import PasswordSharpIcon from "@mui/icons-material/PasswordSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useNavigate, } from "react-router-dom";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import toast from "react-hot-toast";
import { baseUrl } from '../../helpers/baseUrl';
import { UserContext } from "../../Context/UserContext";
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const { signup } = useContext(UserContext);
    const { register, handleSubmit } = useForm();

    const handleSignUp = async (data) => {
        if (data !== "") {
            try {
                const api = await axios.post(`${baseUrl}/api/signup`, data, {
                    withCredentials: true
                });
                const res = api.data;
                console.log("SignUp data => ", res);
                signup(data);
                toast.success("Registration Successfull !!")
                navigate('/');
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
            <form onSubmit={handleSubmit(handleSignUp)} style={{ borderRightColor: "#FAF5FF" }}>
                <div className="flex items-center justify-center mt-24 mb-10 ">
                    <div
                        // className='flex flex-col gap-6 ml-48 w-96 mt-10'
                        className="flex flex-col gap-6 items-center  mt-10"
                    >
                        <span className="">
                            <Avatar sx={{ bgcolor: deepPurple[600] }}>
                                <LockOutlinedIcon />
                            </Avatar>
                        </span>
                        <span className="text-center text-xl font-mono font-bold">
                            Please Register Here
                        </span>

                        <TextField
                            variant="outlined"
                            label="Username*"
                            color="primary"
                            className="sm:w-96 w-80"
                            name="username"
                            {...register("username", {
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
                            label="Email*"
                            color="primary"
                            className="sm:w-96 w-80"
                            name="username"
                            {...register("email", {
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
                            label="Role*"
                            color="primary"
                            className="sm:w-96 w-80"
                            name="role"
                            {...register("role", {
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
                            label="Password*"
                            type="password"
                            color="primary"
                            className="sm:w-96 w-80"
                            name="password"
                            {...register("password", {
                                required: true
                            })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordSharpIcon />
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
                            endIcon={<LoginSharpIcon />}
                        >
                            Sign Up
                        </Button>

                        <p className="text-center -m-4">Already have an account ?</p>
                        <Button
                            variant="text"
                            color="primary"
                            size="medium"
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            Login
                        </Button>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup
