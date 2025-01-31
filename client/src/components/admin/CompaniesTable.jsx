import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A List Of your recent registerd Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Avatar className="border border-gray-300 rounded-full p-1">
                                <AvatarImage
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNp0Nv1kGgeyKZCHKvg8V7Q9_3RwZUkxz8bw&s"
                                    alt="Company Logo"
                                />
                            </Avatar>
                        </TableCell>
                        <TableCell>Google</TableCell>
                        <TableCell>2022-01-01</TableCell>
                        <TableCell className="text-right cursor-pointer">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                        <Edit2 />
                                        <span>Edit</span>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Logo2</TableCell>
                        <TableCell>Company2</TableCell>
                        <TableCell>2022-02-01</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Logo3</TableCell>
                        <TableCell>Company3</TableCell>
                        <TableCell>2022-03-01</TableCell>
                        <TableCell>View</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable