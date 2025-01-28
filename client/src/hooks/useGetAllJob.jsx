import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJob = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            const fetchAllJobs = async () => {
                const { data } = await axios.get(`${JOB_API_END_POINT}/all/jobs`, {
                    withCredentials: true
                });
                if (data.status) {
                    dispatch(setAllJobs(data.jobs));
                }
            }
            fetchAllJobs();
        } catch (error) {
            console.log(error?.message);
        }
    }, [])
}

export default useGetAllJob