import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import useGetSingleJob from '@/hooks/usetGetSingleJob'
import axios from 'axios'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants'
import moment from 'moment'
import { toast } from 'react-toastify'

const JobDescription = () => {


    const { id } = useParams();
    const dispatch = useDispatch()
    const { singleJob } = useSelector(state => state.jobSlice);
    const { user } = useSelector(state => state.authSlice);
    const applied = singleJob?.applications?.some(application => application?.applier === user?._id) || false
    const [isApplied, setIsApplied] = useState(applied);

    const applyJobHandler = async () => {
        try {
            const { data } = await axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`, {
                withCredentials: true
            });
            console.log(data);
            if (data.success) {
                setIsApplied(true); //update application status
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applier: user?._id }] }
                dispatch(setSingleJob(updateSingleJob))
                toast.success(data?.message);
            }
        } catch (error) {
            console.log(error?.message);
        }
    }
    useEffect(() => {
        try {
            const fetchSingleJobs = async () => {
                const { data } = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
                    withCredentials: true
                });
                if (data.status) {
                    dispatch(setSingleJob(data.job));
                    setIsApplied(data?.job?.applications.some(application => application?.applier === user?._id)) //ensure state of user is applied already or not
                }
            }
            fetchSingleJobs();
        } catch (error) {
            console.log(error?.message);
        }
    }, [id, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position}</Badge>
                        <Badge className='text-[#f83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] font-bold' variant="ghost">{singleJob?.salary}</Badge>
                    </div>
                </div>
                <Button disabled={applied} className={`rounded-lg ${applied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`} onClick={applied ? null : applyJobHandler}>{applied ? "Already applied" : "Apply Now"}</Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'>Total: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Total Application: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{moment(singleJob?.createdAt).format("DD MMMM YYYY")}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription