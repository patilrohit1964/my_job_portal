import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { toast } from 'react-toastify'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CompaniesTable = () => {

    const { companies } = useSelector(state => state.company);
    const navigate = useNavigate();

    return (
        <div>
            {
                companies && companies.length > 0 ?
                    <Table>
                        <TableCaption>A List Of your recent registerd Companies</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Logo</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                companies?.map((company) => (
                                    <TableRow key={company?._id}>
                                        <TableCell>
                                            <Avatar className="border border-gray-300 rounded-full p-1">
                                                <AvatarImage
                                                    src={company?.logo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNp0Nv1kGgeyKZCHKvg8V7Q9_3RwZUkxz8bw&s"}
                                                    alt="Company Logo"
                                                />
                                            </Avatar>
                                        </TableCell>
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
                    : <h1 className='h-96 flex items-center justify-center text-2xl text-gray-500'>You Don't Yet Have Any Registerd Company</h1>
            }
        </div>
    )
}

export default CompaniesTable