import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const JobDescription = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleJob } = useSelector((state) => state.jobSlice);
    const { user } = useSelector((state) => state.authSlice);

    const applied = singleJob?.applications?.some(
        (application) => application?.applier === user?._id
    ) || false;

    const [isApplied, setIsApplied] = useState(applied);

    const applyJobHandler = async () => {
        try {
            const { data } = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${id}`,
                { withCredentials: true }
            );

            if (data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applier: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(data?.message);
            }
        } catch (error) {
            console.error(error?.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const { data } = await axios.get(
                    `${JOB_API_END_POINT}/get/${id}`,
                    { withCredentials: true }
                );

                if (data.success) {
                    dispatch(setSingleJob(data.job));
                    setIsApplied(
                        data?.job?.applications.some(
                            (application) => application?.applier === user?._id
                        )
                    );
                }
            } catch (error) {
                console.error(error?.message);
            }
        };

        fetchSingleJob();
    }, [id, dispatch, user?._id]);

    return (
        <motion.div
            className='max-w-7xl mx-auto my-10 p-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant='ghost'>
                            {singleJob?.position}
                        </Badge>
                        <Badge className='text-[#f83002] font-bold' variant='ghost'>
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className='text-[#7209b7] font-bold' variant='ghost'>
                            {singleJob?.salary}
                        </Badge>
                    </div>
                </div>
                <Button
                    disabled={applied}
                    className={`rounded-lg ${applied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'} transition-all duration-300`}
                    onClick={applied ? null : applyJobHandler}
                >
                    {applied ? 'Already applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4 text-gray-800'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal'>{singleJob?.experienceLevel}</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'>Total Applications: <span className='pl-4 font-normal'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal'>{moment(singleJob?.createdAt).format('DD MMMM YYYY')}</span></h1>
            </div>
        </motion.div>
    );
};

export default JobDescription;
