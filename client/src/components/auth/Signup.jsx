import { Link } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { useState } from 'react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
        password: "",
        role: "student",
        file: ""
    })
    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-md' onSubmit={handleSubmit}>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div>
                        <Label>Full Name</Label>
                        <Input type="text" name="fullname" placeholder="enter your fullname" value={input.fullname} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Input type="text" name="phonenumber" placeholder="enter your phone number" value={input.phonenumber} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input type="text" name="email" placeholder="enter your email" value={input.email} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input type="text" name="password" placeholder="enter your password" value={input.password} onChange={changeEventHandler} />
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <RadioGroup className="flex items-center gap-4 my-4">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" id="r1" checked={input.role === "student"} onChange={changeEventHandler} />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" id="r1" checked={input.role === "recruiter"} onChange={changeEventHandler} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file" className="cursor-pointer" onChange={changeFileHandler} />
                        </div>
                    </div>
                    <Button type="submit" className="w-full my-4">Signup</Button>
                    <div className='text-sm text-center'>Already have an account? <Link to={"/login"} className='text-blue-600'>Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Signup