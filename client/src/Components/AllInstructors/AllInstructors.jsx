import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../../helpers/baseUrl';
import {
    Menu,
    MenuItem,
    Button
} from "@mui/material";

function AllInstructors() {
    const [data, setData] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            const api = await axios.get(`${baseUrl}/api/getAllInstructors`);
            const { data } = api;
            setData(data.instructors);
        }
        fetchData();
    })



    return (
        <div>
            <div className='flex flex-col items-center justify-center mt-10'>
                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    All Instructors
                </Button>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {data.map((name) => (
                        <MenuItem key={name._id} onClick={handleClose}>
                            {name.name}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </div>

    )
}

export default AllInstructors;