import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
    const { allJobs } = useSelector(state => state.jobSlice);

    return (
        <div className="max-w-7xl mx-auto my-20 px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center">
                <span className="text-[#6138c2]">Latest & Top Job Openings </span>
            </h1>

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
                {allJobs?.length === 0 ? (
                    <span className="text-gray-500 text-lg col-span-full text-center">
                        No Jobs Available
                    </span>
                ) : (
                    allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                )}
            </div>
        </div>
    );
};

export default LatestJobs;
