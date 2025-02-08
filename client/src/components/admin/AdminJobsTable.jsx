import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

//ensure get admin jobs correctly that admin added their jobs
const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store?.jobSlice);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])
    return (
        <div>
            {
                filterJobs && filterJobs.length > 0 ?
                    <Table>
                        <TableCaption>A List Of your recent posted jobs Companies</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                filterJobs?.map((job) => (
                                    <tr key={job?._id}>
                                        <TableCell>{job?.company?.name}</TableCell>
                                        <TableCell>{job?.position}</TableCell>
                                        <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
                                                    </div>
                                                    <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                        <Eye className='w-4' />
                                                        <span>Applicants</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </tr>

                                ))
                            }
                        </TableBody>
                    </Table>
                    : <h1 className='h-96 flex items-center justify-center text-2xl text-gray-500'>You Don't Yet Have Any Post Job</h1>
            }
        </div>
    )
}

export default AdminJobsTable