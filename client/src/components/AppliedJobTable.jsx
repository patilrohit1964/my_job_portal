import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "./ui/badge"
import { useSelector } from "react-redux"
import moment from "moment";

export default function AppliedJobTable() {
    const { allAppliedJobs } = useSelector(state => state?.jobSlice);

    return (
        <Table>
            <TableCaption>A list of your applied jobs.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allAppliedJobs && allAppliedJobs?.length > 0 ? allAppliedJobs?.map((applyJob) => (
                    <TableRow key={applyJob?._id}>
                        <TableCell className="font-medium">{moment(applyJob).format("MMM-DD-YYYY")}</TableCell>
                        <TableCell>{applyJob?.job?.position}</TableCell>
                        <TableCell>{applyJob?.job?.company?.name}</TableCell>
                        <TableCell className="text-right capitalize"><Badge className={`${applyJob?.status === "accepted" ? 'bg-green-500' : applyJob?.status === "rejected" ? "bg-red-600" : 'bg-gray-500'} cursor-pointer`} >{applyJob?.status}</Badge></TableCell>
                    </TableRow>
                )) : <span>You haven't applied any job yet.</span>}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">
                        {
                            allAppliedJobs && allAppliedJobs?.length > 0 ? allAppliedJobs?.length : "No jobs were you applied"
                        }
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
