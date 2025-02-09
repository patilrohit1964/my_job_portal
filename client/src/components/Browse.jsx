import { useDispatch, useSelector } from "react-redux"
import Job from "./Job"
import Navbar from "./shared/Navbar"
import { useEffect } from "react"
import { setSearchedQuery } from "@/redux/jobSlice"
import useGetAllJob from "@/hooks/useGetAllJob"



const Browse = () => {
  useGetAllJob();
  const { allJobs } = useSelector(state => state?.jobSlice);
  const dispatach = useDispatch();
  useEffect(() => {
    return () => {
      dispatach(setSearchedQuery(""));
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 pl-3">
        <h1 className="font-bold text-xl my-10">search results: {allJobs?.length}</h1>
        <div className="grid grid-cols-3 gap-4">
          {
            allJobs?.map((item, index) => (
              <Job key={item?._id} job={item} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Browse