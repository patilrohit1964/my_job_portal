import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { toast } from 'react-toastify'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import { useParams } from 'react-router-dom'

const short = ["re", "send"]
const ApplicationsTable = () => {
    const { id } = useParams();
    const { applications } = useSelector(state => state?.applicationSlice);
    const statusHandler = async (status, id) => {
        try {
            const { data } = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}`, "data", {
                withCredentials: true
            })
            if (data?.status) {
                toast.success(data?.message);
            }
        } catch (error) {
            toast.error(error?.message);
            console.error(error);
        }
    }
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
                    {
                        applications && applications?.applications?.map((item) => (
                            <TableRow key={item?._id}>
                                <TableCell>{item?.applier?.fullname}</TableCell>
                                <TableCell>{item?.applier?.email}</TableCell>
                                <TableCell>{item?.applier?.phoneNumber}</TableCell>
                                <TableCell><a href={`${item?.applier?.profile?.resume}`} target='_blank' className="hover:text-blue-500">{item?.applier?.profile?.resumeOriginalName}</a></TableCell>
                                <TableCell>{moment(item?.createdAt).format("YYYY-MMM-DD")}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32"></PopoverContent>
                                        {short.map((status, index) => (
                                            <div key={index} className='flex w-fit my-2 cursor-pointer items-center'>
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicationsTable