import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import useGetSingleJob from '@/hooks/usetGetSingleJob'
import axios from 'axios'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/constants'

const JobDescription = () => {

    const applied = true;
    const { id } = useParams();
    const dispatch = useDispatch()
    const { singleJob } = useSelector(state => state.jobSlice)
    useEffect(() => {
        try {
            const fetchSingleJobs = async () => {
                const { data } = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
                    withCredentials: true
                });
                if (data.status) {
                    dispatch(setSingleJob(data.jobs));
                }
            }
            fetchSingleJobs();
        } catch (error) {
            console.log(error?.message);
        }
    }, [id, dispatch, singleJob?._id])
    console.log(singleJob)
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Title</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">part time</Badge>
                        <Badge className='text-[#f83002] font-bold' variant="ghost">part time</Badge>
                        <Badge className='text-[#7209b7] font-bold' variant="ghost">part time</Badge>
                    </div>
                </div>
                <Button disabled={applied} className={`rounded-lg ${applied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}>{applied ? "Already applied" : "Apply Now"}</Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Total: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Total Application: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
            </div>
        </div>
    )
}

export default JobDescription