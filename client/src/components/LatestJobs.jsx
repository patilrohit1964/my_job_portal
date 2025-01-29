import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
    const { allJobs } = useSelector(state => state.jobSlice)
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6138c2]'>Latest & Top Job Openings </span> Job Opening</h1>
            {/* job card */}
            <div className='grid grid-cols-3 gap-4 my-8'>
                {
                    allJobs?.length < 0 ? <span>No Jobs</span> : allJobs?.slice(0, 6)?.map((job, index) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs