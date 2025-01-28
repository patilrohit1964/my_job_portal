import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'

const useGetAllJob = () => {
    useEffect(() => {
        try {
            const fetchAllJobs = async () => {
                const { data } = await axios.get(`${JOB_API_END_POINT}/all/jobs`)
            }
        } catch (error) {

        }
    }, [])
    return (
        <div>useGetAllJob</div>
    )
}

export default useGetAllJob