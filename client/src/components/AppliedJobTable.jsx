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
                {allAppliedJobs?.map((applyJob) => (
                    <TableRow key={applyJob?._id}>
                        <TableCell className="font-medium">{moment(applyJob).format()}</TableCell>
                        <TableCell>{applyJob?.job?.position}</TableCell>
                        <TableCell>{applyJob?.job?.company?.name}</TableCell>
                        <TableCell className="text-right"><Badge>{applyJob?.status}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">
                        {
                            allAppliedJobs && allAppliedJobs?.length > 0 ? allAppliedJobs?.length : "No jobs were applied"
                        }
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
