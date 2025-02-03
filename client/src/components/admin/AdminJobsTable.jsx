import { Edit2, MoreHorizontal } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const AdminJobsTable = () => {
    const { companies } = useSelector(state => state.company);
    const { allAdminJobs, searchJobByText } = useSelector(state => state.jobSlice);
    const [filterJobs, setFilterJobs] = useState(companies)
    const navigate = useNavigate();
    useEffect(() => {
        const filterdJobs = allAdminJobs?.length > 0 && companies?.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.name?.toLowerCase().includes(searchJobByText?.toLowerCase());
        });
        setFilterJobs(filterdJobs);
    }, [companies, searchJobByText])
    console.log(filterJobs)
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
                                filterJobs?.map((company) => (
                                    <TableRow key={company?._id}>
                                        <TableCell>{company?.name}</TableCell>
                                        <TableCell>{moment(company?.createAt).format("DD MMM, YYYY")}</TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <MoreHorizontal />
                                                </PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                        <Edit2 />
                                                        <span onClick={() => navigate(`/admin/companies/${company?._id}`)}>Edit</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
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