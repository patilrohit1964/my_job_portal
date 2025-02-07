import React from 'react'
import { Table, TableBody, TableCaption, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'

const short = ["re", "send"]
const ApplicationsTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A List of your applications</TableCaption>
                <TableHeader>
                    <TableRow>Fullname</TableRow>
                    <TableRow>Email</TableRow>
                    <TableRow>Contact</TableRow>
                    <TableRow>Resume</TableRow>
                    <TableRow>Date</TableRow>
                    <TableRow classname="text-right">Action</TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>Fullname</TableRow>
                    <TableRow>Email</TableRow>
                    <TableRow>Contact</TableRow>
                    <TableRow>Resume</TableRow>
                    <TableRow>Date</TableRow>
                    <TableRow classname="text-right">
                        <Popover>
                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                            <PopoverContent classname="w-32"></PopoverContent>
                            {short.map((status, index) => (
                                <div key={index} className='flex w-fit my-2 cursor-pointer items-center'>
                                    <span></span>
                                </div>
                            ))}
                        </Popover>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicationsTable