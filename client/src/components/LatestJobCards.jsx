import { Badge } from 'lucide-react'
import React from 'react'

const LatestJobCards = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1>Company name</h1>
                <p>india</p>
            </div>
            <div>
                <h1>Job title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam illum odio facilis.</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">part time</Badge>
                <Badge className='text-[#f83002] font-bold' variant="ghost">part time</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">part time</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards