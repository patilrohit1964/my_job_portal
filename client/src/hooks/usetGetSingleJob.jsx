import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSingleJob = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            const fetchSingleJobs = async () => {
                const { data } = await axios.get(`${JOB_API_END_POINT}/all/jobs`, {
                    withCredentials: true
                });
                if (data.status) {
                    dispatch(setAllJobs(data.jobs));
                }
            }
            fetchSingleJobs();
        } catch (error) {
            console.log(error?.message);
        }
    }, [])
}

export default useGetSingleJob