import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            const fetchAllAdminJobs = async () => {
                const { data } = await axios.get(`${JOB_API_END_POINT}/getAdmin/jobs`, {
                    withCredentials: true
                });
                if (data?.success) {
                    dispatch(setAllAdminJobs(data?.jobs));
                }
            }
            fetchAllAdminJobs();
        } catch (error) {
            console.log(error?.message);
        }
    }, [])
}

export default useGetAllAdminJobs;