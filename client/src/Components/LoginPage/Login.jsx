import React, { useContext } from 'react'
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import PasswordSharpIcon from "@mui/icons-material/PasswordSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { baseUrl } from '../../helpers/baseUrl';
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";

function Login() {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const handleLogin = async (data) => {
        if (data !== "") {
            try {
                const api = await axios.post(`${baseUrl}/api/login`, data, {
                    withCredentials: true
                });
                const res = api.data;
                console.log("User => ", res);
                login(data.username)
                toast.success("Login Successfull !!")
                if (res.role === "admin") {
                    navigate("/admin")
                } else {
                    navigate("/instructor")
                }
            } catch (error) {
                console.error("Err logging user => ", error.message);
            }
        } else {
            toast.error("Please Enter Login Credentials");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin)} style={{ borderRightColor: "#FAF5FF" }}>
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
                            Welcome back 👋👋
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
                            label="Password*"
                            type="password"
                            color="primary"
                            className="sm:w-96 w-80"
                            {...register("password", {
                                required: true
                            })}
                            name="password"
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
                            //  onClick={handleLogin}
                            className="sm:w-60 w-48"
                            endIcon={<LoginSharpIcon />}
                        >
                            Continue
                        </Button>

                        <p className="text-center -m-4">OR</p>
                        <Button
                            variant="text"
                            color="primary"
                            size="medium"
                            onClick={() => {
                                navigate('/signup')
                            }}
                        >
                            Create an account
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
