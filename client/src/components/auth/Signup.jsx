import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-md'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div>
                        <Label>Full Name</Label>
                        <Input type="text" placeholder="enter your fullname" />
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Input type="text" placeholder="enter your phone number" />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input type="text" placeholder="enter your email" />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input type="text" placeholder="enter your password" />
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <RadioGroup className="flex items-center gap-4 my-4">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" className="cursor-pointer" name="role" value="student" id="r1" defaultChecked />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" className="cursor-pointer" name="role" value="recruiter" id="r2" />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file" className="cursor-pointer" />
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