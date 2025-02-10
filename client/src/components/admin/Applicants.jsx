import { setAllApplicants } from '@/redux/applicationSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../shared/Navbar';
import ApplicationsTable from './ApplicationsTable';

const Applicants = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { applications } = useSelector(state => state.applicationSlice);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const { data } = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applier`, {
                    withCredentials: true,
                });

                if (data?.success) {
                    dispatch(setAllApplicants(data.job));

                    // Avoid redundant toast notifications
                    if (data.job?.length > 0) {
                        toast.success(data?.message || "Applicants Fetched Successfully!");
                    }
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something went wrong!");
                console.error(error);
            }
        };

        if (id) fetchApplicants(); // Fetch only if `id` exists

    }, [id, dispatch]); // Added dependencies

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl my-5">
                    Applications ({applications?.applications?.length || 0})
                </h1>
                <ApplicationsTable applications={applications?.applications} />
            </div>
        </div>
    );
};

export default Applicants;
