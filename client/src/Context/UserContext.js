import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [instructorName, setinstructorName] = useState("");
    const [role, setRole] = useState("");

    const login = (instructorName) => {
        setinstructorName(instructorName)
    }
    const signup = (role) => {
        setRole(role)
    }

    return (
        <UserContext.Provider value={{ instructorName, login, role, signup }}>
            {children}
        </UserContext.Provider>
    )
}