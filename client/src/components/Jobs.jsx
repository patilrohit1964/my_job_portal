import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import FilterCard from './FilterCard'
import { useSelector } from 'react-redux'

const Jobs = () => {
  const { allJobs } = useSelector(state => state.jobSlice)

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className="w-full sm:w-[25%] lg:w-[20%]">
            <FilterCard />
          </div>
          {
            allJobs?.length === 0 ? <span className="text-xl text-gray-700">Job Not Found</span> :
              (
                <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                      allJobs?.map((job, index) => (
                        <div key={job?._id} className="transform transition duration-500 hover:scale-105 p-4 rounded-lg">
                          <Job job={job} />
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs
