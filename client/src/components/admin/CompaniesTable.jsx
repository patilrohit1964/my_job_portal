import React from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'

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
            </Table>
        </div>
    )
}

export default CompaniesTable