import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectRoute = ({ children }) => {
    const { user } = useSelector(store => store.authSlice);
   
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null || user?.role !== "recruiter") {
            navigate("/");
        }
    }, [])
    return (
        <div>{children}</div>
    )
}

export default ProtectRoute