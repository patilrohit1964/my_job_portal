import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJob from "@/hooks/useGetAllJob";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJob();
  const { allJobs } = useSelector(state => state?.jobSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-xl my-10">Search Results: {allJobs?.length}</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {allJobs?.map((item) => (
            <motion.div key={item?._id} whileHover={{ scale: 1.03 }}>
              <Job job={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;
