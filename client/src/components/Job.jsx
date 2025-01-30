import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { AvatarImage, Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Job = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-all md:p-8"
        >
            {/* Top Section */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{moment(job?.createdAt).fromNow()}</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3 my-3">
                <Avatar className="border border-gray-300">
                    <AvatarImage
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNp0Nv1kGgeyKZCHKvg8V7Q9_3RwZUkxz8bw&s"
                    />
                </Avatar>
                <div>
                    <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-600">India</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-xl my-2 text-gray-900">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="text-blue-700 font-semibold bg-blue-100">{job?.position}</Badge>
                <Badge className="text-red-600 font-semibold bg-red-100">{job?.jobType}</Badge>
                <Badge className="text-purple-700 font-semibold bg-purple-100">{job?.salary}</Badge>
            </div>

            {/* Buttons */}
            <div className="flex items-center mt-5 gap-4">
                <Button
                    variant="outline"
                    className="hover:bg-gray-100 transition-all w-full sm:w-auto"
                    onClick={() => navigate(`/jobs/description/${job?._id}`)}
                >
                    Details
                </Button>
                <Button className="bg-purple-700 hover:bg-purple-900 text-white transition-all w-full sm:w-auto">
                    Save for later
                </Button>
            </div>
        </motion.div>
    );
};

export default Job;
