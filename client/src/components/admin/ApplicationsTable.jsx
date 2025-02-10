import { setAllApplicants } from '@/redux/applicationSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const short = ["Accepted", "Rejected"];

const ApplicationsTable = () => {
    const dispatch = useDispatch();
    const { applications } = useSelector(state => state?.applicationSlice);
    const { allAppliedJobs } = useSelector(state => state?.jobSlice);

    const statusHandler = async (newStatus, id) => {
        try {
            const currentApplication = applications?.applications?.find(app => app?._id === id);

            // Avoid unnecessary API calls
            if (currentApplication?.status === newStatus) {
                toast.info(`Already ${newStatus}`);
                return;
            }

            const { data } = await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status: newStatus }, {
                withCredentials: true
            });

            if (data?.success) {
                toast.success(data?.message);

                // Update Redux store after status change
                const updatedApplications = applications?.applications?.map(app =>
                    app._id === id ? { ...app, status: newStatus } : app
                );
                dispatch(setAllApplicants({ applications: updatedApplications }));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
            console.error(error);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A List of your applications</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fullname</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications?.applications?.map((item) => (
                        <TableRow key={item?._id}>
                            <TableCell>{item?.applier?.fullname}</TableCell>
                            <TableCell>{item?.applier?.email}</TableCell>
                            <TableCell>{item?.applier?.phoneNumber}</TableCell>
                            <TableCell>
                                {item?.applier?.profile?.resume ? (
                                    <a href={item?.applier?.profile?.resume}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-800 text-blue-600">
                                        {item?.applier?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span>N/A</span>
                                )}
                            </TableCell>
                            <TableCell>{moment(item?.createdAt).format("YYYY-MMM-DD")}</TableCell>
                            <TableCell className="float-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {short.map((status, index) => (
                                            <div
                                                key={index}
                                                className='flex w-fit my-2 cursor-pointer items-center'
                                                onClick={() => statusHandler(status, item?._id)}
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicationsTable;
