import { APPLICATION_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const useGetAllAppliedJobs = () => {
    useEffect(() => {
        const fetchAllAppliedJobs = async () => {
            try {
                const { data } = await axios.get(`${APPLICATION_API_END_POINT}/applied-jobs`, { withCredentials: true });
                if (data?.success) {
                    toast.success(data?.message || "Applied jobs");
                }
            } catch (error) {
                console.log(error?.message);
                toast.success(error?.message);
            }
        }
        fetchAllAppliedJobs();
    }, [])
}

export default useGetAllAppliedJobs