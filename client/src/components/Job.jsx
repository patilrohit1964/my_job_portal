import React from 'react'
import { Button } from './ui/button'
import { Badge, Bookmark } from 'lucide-react'
import { AvatarImage, Avatar } from './ui/avatar'

const Job = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant="outline" classname="rounded-full" size="icon"><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button classname="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNp0Nv1kGgeyKZCHKvg8V7Q9_3RwZUkxz8bw&s" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company name</h1>
                    <p className='text-sm text-gray-600'>India</p>
                </div>
            </div>
            <div className=''>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa beatae nulla rerum? Perspiciatis mollitia eveniet modi nobis quibusdam? Enim, vero?</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">part time</Badge>
                <Badge className='text-[#f83002] font-bold' variant="ghost">part time</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">part time</Badge>
            </div>
            <div className='flex items-center mt-4 gap-4'>
                <Button variant="outline">Details</Button>
                <Button className='bg-[#7209b7]'>save for later</Button>
            </div>
        </div>
    )
}

export default Job