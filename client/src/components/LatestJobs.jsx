import React from 'react'
import LatestJobCards from './LatestJobCards'

const random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const LatestJobs = () => {
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6138c2]'>Latest & Top Job Openings</span>Job Opening</h1>
            {/* job card */}
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    random.slice(0, 6).map((item, index) => <LatestJobCards key={index} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs