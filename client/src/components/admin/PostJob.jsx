import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constants'
import { toast } from 'react-toastify'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: 0,
        location: "",
        jobType: "",
        experience: 0,
        position: 0,
        companyId: ""
    })
    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${JOB_API_END_POINT}/create-job`, input, {
                withCredentials: true
            })
            if (data?.success) {
                toast.success(data?.message || "Job Posted Successfully")
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }
    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-10 flex-col'>
                <div className='grid grid-cols-2 gap-2'>
                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 foucs-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 foucs-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input
                            type="text"
                            name="requirements"
                            value={input.requirements}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 foucs-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input
                            type="number"
                            name="salary"
                            value={input.salary}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 foucs-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 foucs-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Job Type</Label>
                        <Input
                            type="text"
                            name="jobType"
                            value={input.jobType}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 foucs-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Experience Level</Label>
                        <Input
                            type="text"
                            name="experience"
                            value={input.experience}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 foucs-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Position</Label>
                        <Input
                            type="number"
                            name="position"
                            value={input.position}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 foucs-visible:ring-0 my-1"
                        />
                    </div>
                    <div>
                        <Label>Company ID</Label>
                        <Input
                            type="text"
                            name="companyId"
                            value={input.companyId}
                            onChange={handleInputChange}
                            className="focus-visible:ring-offset-0 foucs-visible:ring-0 my-1"
                        />
                    </div>
                </div>
                <div className='my-5 w-80'>
                    <Button className="w-full" onClick={handleSubmit}>Post Job</Button>
                </div>
            </div>
        </>
    )
}

export default PostJob