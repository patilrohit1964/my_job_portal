import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJob = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(state => state?.jobSlice);
    useEffect(() => {
        try {
            const fetchAllJobs = async () => {
                const { data } = await axios.get(`${JOB_API_END_POINT}/all/jobs?keyword=${searchedQuery}`, {
                    withCredentials: true
                });
                if (data.success) {
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