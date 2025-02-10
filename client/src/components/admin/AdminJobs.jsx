import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { debounce } from "lodash"; // Import debounce for optimized searching
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Debounced Search Function
  const debouncedSearch = debounce((value) => {
    dispatch(setSearchJobByText(value));
  }, 300); // Adjust debounce delay as needed

  useEffect(() => {
    debouncedSearch(input);
    return () => debouncedSearch.cancel(); // Cleanup to avoid memory leaks
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-3">
          <Input
            className="w-full sm:w-fit"
            placeholder="Filter by job title"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>New Job</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
