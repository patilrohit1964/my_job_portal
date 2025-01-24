import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'react-toastify'
const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: ""
    })

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("role", input.role);
        formData.append("password", input.password);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (res.data.success) {
                navigate("/");
                toast.success('User registered successfully');
                setInput({ fullname: "", email: "", phoneNumber: "", password: "", role: "student", file: "" });
            }
        } catch (error) {
            console.error(error?.message);
        }
    }
    useEffect(() => {

    }, [])


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
                        <Input type="text" name="phoneNumber" placeholder="enter your phone number" value={input.phoneNumber} onChange={changeEventHandler} />
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
                                <Input type="radio" name="role" value="recruiter" id="r2" checked={input.role === "recruiter"} onChange={changeEventHandler} />
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