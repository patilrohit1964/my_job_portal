import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })
    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    return (
        <div className='flex items-center justify-center w-screen my-5'>
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
    )
}

export default PostJob