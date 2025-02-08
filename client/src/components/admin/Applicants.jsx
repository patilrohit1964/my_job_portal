import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicationsTable from './ApplicationsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const { data } = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applier`, {
                    withCredentials: true,
                })
                if (data?.success) {
                    dispatch(setAllApplicants(data.job));
                    toast.success(data?.message || "Applier Applications");
                }
            } catch (error) {
                toast.error(error.message || "some error");
                console.error(error?.message);
            }
        }
        fetchApplicants();
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applications 6</h1>
                <ApplicationsTable />
            </div>
        </div>
    )
}

export default Applicants